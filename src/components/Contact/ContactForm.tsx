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
import { CONTACT_FORM_FIELDS } from "./contactFormFields";
import { useContactForm } from "./useContactForm";
import "../../assets/styles/Contact/Contact.css";

function ContactForm() {
  const { t } = useTranslation();
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
  const { formData, fieldErrors, isSubmitting, status, clearStatus, handleChange, handleSubmit } = useContactForm(recaptchaSiteKey);
  // Status messages stay translated while API fallbacks can still be surfaced verbatim.
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
          id="contact-form-status"
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
          {CONTACT_FORM_FIELDS.map((field) => {
            const errorKey = fieldErrors[field.name];
            // The generated id links each field to its own validation message for screen readers.
            const errorId = `${field.controlId}-error`;

            return (
              <Col key={field.name} md={field.colMd} xs={12}>
                <Form.Group controlId={field.controlId}>
                  <Form.Label>{t(field.labelKey)}</Form.Label>
                  <Form.Control
                    as={field.as}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    autoComplete={field.autoComplete}
                    rows={field.rows}
                    placeholder={t(field.placeholderKey)}
                    className="custom-form"
                    aria-invalid={Boolean(errorKey)}
                    aria-describedby={errorKey ? errorId : undefined}
                  />

                  {errorKey && (
                    <p id={errorId} className="contact-field-error">
                      {t(errorKey)}
                    </p>
                  )}
                </Form.Group>
              </Col>
            );
          })}
        </Row>

        <Button
          type="submit"
          className="mt-4 button-cv contact-submit-btn"
          disabled={isSubmitting}
          aria-describedby={status ? "contact-form-status" : undefined}
        >
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
