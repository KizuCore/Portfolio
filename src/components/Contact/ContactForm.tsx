import {
  Alert,
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
import { Link } from "react-router-dom";
import { getLocalizedPath, getShortLocale } from "../../config/seo";
import { SITE_PROFILE } from "../../data/portfolio";

function ContactForm() {
  const { t, i18n } = useTranslation();
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
  const { formData, fieldErrors, isSubmitting, captchaConsent, setCaptchaConsent, status, clearStatus, handleChange, handleSubmit } = useContactForm(recaptchaSiteKey);
  // Les messages d’état restent traduits, tandis que les messages de repli de l’API peuvent être affichés tels quels.
  const responseMessage = status ? t(status.translationKey, status.fallbackMessage || t("message_fail")) : "";

  return (
    <div className="contact-form-card">
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
            // L’identifiant généré relie chaque champ à son message de validation pour les lecteurs d’écran.
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

        <div className="contact-privacy">
          <p>{t("contact_privacy.notice")} <Link to={getLocalizedPath(getShortLocale(i18n.language), "/politique-de-confidentialite")}>{t("footer_links.privacy")}</Link></p>
          <Form.Check id="contact-captcha-consent" type="checkbox" checked={captchaConsent}
            disabled={isSubmitting} onChange={(event) => setCaptchaConsent(event.currentTarget.checked)}
            label={t("contact_privacy.captcha_consent")} aria-describedby="contact-captcha-details" />
          <p id="contact-captcha-details">{t("contact_privacy.captcha_details")} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{t("contact_privacy.google_privacy")}</a> · <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">{t("contact_privacy.google_terms")}</a></p>
          <p>{t("contact_privacy.alternative")} <a href={`mailto:${SITE_PROFILE.email}`}>{SITE_PROFILE.email}</a></p>
        </div>

        <button
          type="submit"
          className="mt-4 contact-submit-btn"
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
        </button>
      </Form>
    </div>
  );
}

export default ContactForm;
