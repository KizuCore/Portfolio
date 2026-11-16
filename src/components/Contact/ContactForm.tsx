import { useState } from "react";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { CONTACT_FORM_FIELDS } from "./contactFormFields";
import { useContactForm } from "./useContactForm";
import "../../assets/styles/Contact/Contact.css";
import { Link } from "react-router-dom";
import { getLocalizedPath, getShortLocale } from "../../config/seo";
import { SITE_PROFILE } from "../../data/portfolio";

function ContactForm() {
  const [hintDismissed, setHintDismissed] = useState(false);
  const [privacyDetailsOpen, setPrivacyDetailsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
  const { formData, fieldErrors, isSubmitting, captchaConsent, setCaptchaConsent, status, clearStatus, handleChange, handleSubmit } = useContactForm(recaptchaSiteKey);
  const missingFields = CONTACT_FORM_FIELDS.filter((field) => !formData[field.name].trim());
  const canSubmit = captchaConsent && missingFields.length === 0;
  const submitHint = [
    missingFields.length > 0 ? t("contact_privacy.missing_fields_hint", { fields: missingFields.map((field) => t(field.labelKey)).join(", ") }) : "",
    !captchaConsent ? t("contact_privacy.missing_consent_hint") : "",
  ].filter(Boolean).join(" ");
  const showSubmitHint = !canSubmit && !isSubmitting;
  // Les messages d’état restent traduits, tandis que les messages de repli de l’API peuvent être affichés tels quels.
  const responseMessage = status ? t(status.translationKey, status.fallbackMessage || t("message_fail")) : "";

  return (
    <div className="contact-form-card">
      <header className="contact-form-header">
        <h2 className="contact-form-title">{t("contact_form_title")}</h2>
        <p className="contact-form-subtitle">{t("contact_form_subtitle")}</p>
        <p className="contact-form-required"><span className="contact-required-marker" aria-hidden="true">*</span> {t("contact_form_required_hint")}</p>
      </header>

      {status && (
        <div id="contact-form-status" role="alert"
          className={`contact-form-alert flex items-start gap-3 rounded-lg border p-4 ${status.variant === "success" ? "border-emerald-400/30 bg-emerald-950/50 text-emerald-100" : "border-rose-400/30 bg-rose-950/50 text-rose-100"}`}>
          <span className="min-w-0 flex-1">{responseMessage}</span>
          <button type="button" onClick={clearStatus} aria-label={t("common.close")}
            className="-m-2 flex size-11 shrink-0 items-center justify-center rounded-md text-xl hover:bg-white/10">&#215;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CONTACT_FORM_FIELDS.map((field) => {
            const errorKey = fieldErrors[field.name];
            // L’identifiant généré relie chaque champ à son message de validation pour les lecteurs d’écran.
            const errorId = `${field.controlId}-error`;

            const inputProps = {
              id: field.controlId,
              name: field.name,
              value: formData[field.name],
              onChange: handleChange,
              required: true,
              autoComplete: field.autoComplete,
              placeholder: t(field.placeholderKey),
              className: "custom-form block w-full",
              "aria-invalid": Boolean(errorKey),
              "aria-describedby": errorKey ? errorId : undefined,
            };
            return (
              <div key={field.name} className={field.halfWidth ? "min-w-0" : "min-w-0 md:col-span-2"}>
                <label htmlFor={field.controlId} className="contact-field-label mb-2 block">
                  {t(field.labelKey)} <span className="contact-required-marker" aria-hidden="true">*</span>
                </label>
                {field.as === "textarea" ? <textarea {...inputProps} rows={field.rows} /> : <input {...inputProps} type={field.type} />}
                {errorKey && <p id={errorId} className="contact-field-error">{t(errorKey)}</p>}
              </div>
            );
          })}
        </div>

        <div className="contact-privacy">
          <p>{t("contact_privacy.summary")} <Link to={getLocalizedPath(getShortLocale(i18n.language), "/politique-de-confidentialite")}>{t("contact_privacy.google_privacy")}</Link></p>
          <label htmlFor="contact-captcha-consent" className="contact-consent flex items-start gap-3">
            <input id="contact-captcha-consent" type="checkbox" checked={captchaConsent}
              className="mt-1 size-4 shrink-0 accent-accent" disabled={isSubmitting}
              onChange={(event) => setCaptchaConsent(event.currentTarget.checked)} aria-describedby="contact-captcha-details" />
            <span>{t("contact_privacy.captcha_consent")}</span>
          </label>
          <div className="contact-privacy-details">
            <button
              type="button"
              className="contact-privacy-toggle"
              aria-expanded={privacyDetailsOpen}
              aria-controls="contact-privacy-panel"
              onClick={() => setPrivacyDetailsOpen((open) => !open)}
            >
              <span>{t("contact_privacy.details_label")}</span>
              <span className="contact-privacy-icon" aria-hidden="true" />
            </button>
            <div id="contact-privacy-panel" className="contact-privacy-panel" aria-hidden={!privacyDetailsOpen}>
              <div className="contact-privacy-content">
                <p id="contact-captcha-details">{t("contact_privacy.captcha_details")} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" tabIndex={privacyDetailsOpen ? undefined : -1}>{t("contact_privacy.google_privacy")}</a> · <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" tabIndex={privacyDetailsOpen ? undefined : -1}>{t("contact_privacy.google_terms")}</a></p>
                <p>{t("contact_privacy.notice")} <Link to={getLocalizedPath(getShortLocale(i18n.language), "/politique-de-confidentialite")} tabIndex={privacyDetailsOpen ? undefined : -1}>{t("footer_links.privacy")}</Link></p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-actions">
        <div className={`contact-submit-area${hintDismissed ? " hint-dismissed" : ""}`}
          role="group" aria-label={t("send_message")}
          tabIndex={showSubmitHint ? 0 : undefined}
          onMouseLeave={() => setHintDismissed(false)}
          onBlur={() => setHintDismissed(false)}
          onKeyDown={(event) => { if (event.key === "Escape") setHintDismissed(true); }}
          onClick={(event) => { if (showSubmitHint) event.currentTarget.focus(); }}
          aria-describedby={showSubmitHint ? "contact-submit-hint" : undefined}>
        <button
          type="submit"
          className="contact-submit-btn"
          disabled={isSubmitting || !canSubmit}
          aria-describedby={status ? "contact-form-status" : undefined}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner small className="me-2" />
              {t("sending")}
            </>
          ) : (
            <>
              <AiOutlineMail className="contact-submit-icon" aria-hidden="true" />
              {t("send_message")}
            </>
          )}
        </button>
        {showSubmitHint && <p id="contact-submit-hint" role="tooltip" className="contact-submit-hint">{submitHint}</p>}
        </div>
        <p className="contact-email-alternative"><a href={`mailto:${SITE_PROFILE.email}`}>{t("contact_privacy.alternative_short")}</a></p>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
