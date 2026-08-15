import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { sendContactEmail } from "../../services/contactApi";
import { getRecaptchaToken, loadRecaptcha } from "../../utils/recaptcha";
import type { ContactFormFields, ContactFormStatus } from "./contact.types";

const EMPTY_FORM: ContactFormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const RECAPTCHA_ACTION = "contact";

export function useContactForm(recaptchaSiteKey: string) {
  const [formData, setFormData] = useState<ContactFormFields>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactFormStatus | null>(null);

  useEffect(() => {
    if (!recaptchaSiteKey) {
      return;
    }

    void loadRecaptcha(recaptchaSiteKey).catch(() => undefined);
  }, [recaptchaSiteKey]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearStatus = () => setStatus(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ variant: "danger", translationKey: "errors.missing_fields" });
      return;
    }

    if (!recaptchaSiteKey) {
      setStatus({ variant: "danger", translationKey: "errors.captcha_failed" });
      return;
    }

    setIsSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken(recaptchaSiteKey, RECAPTCHA_ACTION);
      const result = await sendContactEmail({ ...formData, recaptchaToken });

      if (result.ok && result.data.success) {
        setStatus({ variant: "success", translationKey: "message_success" });
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
    isSubmitting,
    status,
    clearStatus,
    handleChange,
    handleSubmit,
  };
}
