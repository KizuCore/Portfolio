import { ChangeEvent, FormEvent, useState } from "react";
import { sendContactEmail } from "../../services/contactApi";
import { getRecaptchaToken } from "../../utils/recaptcha";
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
      // Load reCAPTCHA only on submit to avoid third-party iframe console noise during page audits.
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
