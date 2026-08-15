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
import { useContactForm } from "./useContactForm";
import "../../assets/styles/Contact/Contact.css";

function ContactForm() {
  const { t } = useTranslation();
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
  const { formData, isSubmitting, status, clearStatus, handleChange, handleSubmit } = useContactForm(recaptchaSiteKey);
  const responseMessage = status ? t(status.translationKey, status.fallbackMessage || t("message_fail")) : "";

  return (
    <div className="contact-form-card background-box">
      <header className="contact-form-header">
        <h2 className="contact-form-title">{t("contact_form_title")}</h2>
        <p className="contact-form-subtitle">{t("contact_form_subtitle")}</p>
        <p className="contact-form-required">{t("contact_form_required_hint")}</p>
      </header>

      {status && (
        <Alert
          variant={status.variant}
          onClose={clearStatus}
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

        <Button type="submit" className="mt-4 button-cv contact-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              {t("sending")}
            </>
          ) : (
            <>
              <AiOutlineMail className="contact-submit-icon" aria-hidden="true" />
              {t("send_message")}
            </>
          )}
        </Button>
      </Form>
    </div>
  );
}

export default ContactForm;
