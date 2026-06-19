import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import "../../assets/styles/Contact/Contact.css";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const RECAPTCHA_ACTION = "contact";
const RECAPTCHA_SCRIPT_ID = "google-recaptcha-v3";

let recaptchaScriptPromise: Promise<void> | null = null;

function loadRecaptcha(siteKey: string) {
  if (window.grecaptcha) {
    return Promise.resolve();
  }

  if (recaptchaScriptPromise) {
    return recaptchaScriptPromise;
  }

  recaptchaScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("recaptcha_load_failed")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("recaptcha_load_failed"));

    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

async function getRecaptchaToken(siteKey: string) {
  await loadRecaptcha(siteKey);

  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("recaptcha_unavailable"));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action: RECAPTCHA_ACTION })
        .then(resolve)
        .catch(reject);
    });
  });
}

function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseVariant, setResponseVariant] = useState<"success" | "danger" | "">("");

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

  useEffect(() => {
    if (!recaptchaSiteKey) {
      return;
    }

    void loadRecaptcha(recaptchaSiteKey).catch(() => undefined);
  }, [recaptchaSiteKey]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setResponseMessage(t("errors.missing_fields"));
      setResponseVariant("danger");
      return;
    }

    if (!recaptchaSiteKey) {
      setResponseMessage(t("errors.captcha_failed"));
      setResponseVariant("danger");
      return;
    }

    setIsSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken(recaptchaSiteKey);
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResponseMessage(t("message_success"));
        setResponseVariant("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const fallback = data.message || t("message_fail");
        const translated = data.errorCode ? t(`errors.${data.errorCode}`) : fallback;
        setResponseMessage(translated);
        setResponseVariant("danger");
      }
    } catch {
      setResponseMessage(t("message_error"));
      setResponseVariant("danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-card background-box">
      <header className="contact-form-header">
        <h2 className="contact-form-title">{t("contact_form_title")}</h2>
        <p className="contact-form-subtitle">{t("contact_form_subtitle")}</p>
        <p className="contact-form-required">{t("contact_form_required_hint")}</p>
      </header>

      {responseMessage && (
        <Alert
          variant={responseVariant}
          onClose={() => setResponseMessage("")}
          dismissible
          className="contact-form-alert"
        >
          {responseMessage}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder={t("name_placeholder")}
                className="custom-form"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>{t("email")}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder={t("email_placeholder")}
                className="custom-form"
              />
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group controlId="formSubject">
              <Form.Label>{t("subject")}</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder={t("subject_placeholder")}
                className="custom-form"
              />
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group controlId="formMessage">
              <Form.Label>{t("message")}</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t("message_placeholder")}
                className="custom-form"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" className="button-cv contact-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              {t("sending")}
            </>
          ) : (
            <>
              <AiOutlineMail className="mb-1" style={{ marginRight: "6px" }} />
              {t("send_message")}
            </>
          )}
        </Button>
      </Form>
    </div>
  );
}

export default ContactForm;
