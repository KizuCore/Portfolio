import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import "../../assets/styles/Contact/Contact.css";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
  const turnstileRef = useRef<TurnstileInstance>();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setResponseMessage(t("errors.missing_fields"));
      setResponseVariant("danger");
      return;
    }

    if (!turnstileToken) {
      setResponseMessage(t("captcha_required"));
      setResponseVariant("danger");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResponseMessage(t("message_success"));
        setResponseVariant("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTurnstileToken(null);
        turnstileRef.current?.reset();
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

        <div className="captcha-container mt-4 mb-4">
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            onSuccess={handleTurnstileVerify}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
            options={{ theme: "dark", size: "normal" }}
          />
        </div>

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
