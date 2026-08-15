import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { sendContactEmail } from "../../services/contactApi";
import { getRecaptchaToken, loadRecaptcha } from "../../utils/recaptcha";
import type { ContactFieldErrors, ContactFormFieldName, ContactFormFields, ContactFormStatus } from "./contact.types";

const EMPTY_FORM: ContactFormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const RECAPTCHA_ACTION = "contact";

export function useContactForm(recaptchaSiteKey: string) {
  const [formData, setFormData] = useState<ContactFormFields>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactFormStatus | null>(null);

  useEffect(() => {
    if (!recaptchaSiteKey) {
      return;
    }

    // Warm the captcha script early so submit latency stays low.
    void loadRecaptcha(recaptchaSiteKey).catch(() => undefined);
  }, [recaptchaSiteKey]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target as { name: ContactFormFieldName; value: string };

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFieldErrors((prevErrors) => {
      if (!prevErrors[name]) {
        return prevErrors;
      }

      const nextErrors = { ...prevErrors };
      delete nextErrors[name];

      return nextErrors;
    });
  };

  const clearStatus = () => setStatus(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Keep validation local and field-specific before asking reCAPTCHA or the API.
    const nextFieldErrors = Object.entries(formData).reduce<ContactFieldErrors>((errors, [name, value]) => {
      if (!value.trim()) {
        errors[name as ContactFormFieldName] = "errors.missing_fields";
      }

      return errors;
    }, {});

    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      setStatus({ variant: "danger", translationKey: "errors.missing_fields" });
      return;
    }

    if (!recaptchaSiteKey) {
      setStatus({ variant: "danger", translationKey: "errors.captcha_failed" });
      return;
    }

    setIsSubmitting(true);

    try {
      // reCAPTCHA v3 returns an action-scoped token that the API validates server-side.
      const recaptchaToken = await getRecaptchaToken(recaptchaSiteKey, RECAPTCHA_ACTION);
      const result = await sendContactEmail({ ...formData, recaptchaToken });

      if (result.ok && result.data.success) {
        setStatus({ variant: "success", translationKey: "message_success" });
        setFieldErrors({});
        setFormData(EMPTY_FORM);
      } else {
        setStatus({
          variant: "danger",
          translationKey: result.data.errorCode ? `errors.${result.data.errorCode}` : "message_fail",
          fallbackMessage: result.data.message,
        });
      }
    } catch {
      setStatus({ variant: "danger", translationKey: "message_error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    fieldErrors,
    isSubmitting,
    status,
    clearStatus,
    handleChange,
    handleSubmit,
  };
}
