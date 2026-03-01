import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getConsent, updateConsent } from "../../utils/consent";
import "../../assets/styles/Legals/CookiePreferences.css";

export default function CookiePreferencesModal() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  useEffect(() => {
    window.openCookiePreferences = () => {
      const current = getConsent();
      setAnalyticsOn(current === "granted");
      setShow(true);
    };

    return () => {
      delete window.openCookiePreferences;
    };
  }, []);

  useEffect(() => {
    if (!show) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShow(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [show]);

  const handleSave = () => {
    updateConsent(analyticsOn);
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="cookie-prefs-modal" role="presentation">
      <button
        type="button"
        className="cookie-prefs-backdrop"
        aria-label={t("common.close", { defaultValue: "Fermer" })}
        onClick={() => setShow(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
        className="cookie-prefs-dialog"
      >
        <div className="cookie-prefs-content">
          <div className="cookie-prefs-header">
            <h2 id="cookie-prefs-title" className="cookie-prefs-title">
              {t("cookie_prefs.title")}
            </h2>
            <button
              type="button"
              className="cookie-prefs-close"
              onClick={() => setShow(false)}
              aria-label={t("common.close", { defaultValue: "Fermer" })}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="cookie-prefs-body">
            <p className="mb-3">
              {t("cookie_prefs.intro_1")}{" "}
              <strong>Google Analytics (GA4)</strong> {t("cookie_prefs.intro_2")}
            </p>

            <div className="cookie-prefs-form">
              <label htmlFor="consent-analytics" className="cookie-prefs-toggle">
                <input
                  id="consent-analytics"
                  type="checkbox"
                  className="form-check-input"
                  checked={analyticsOn}
                  onChange={(event) => setAnalyticsOn(event.currentTarget.checked)}
                />
                <span>{t("cookie_prefs.analytics_label")}</span>
              </label>

              <small className="cookie-prefs-note">{t("cookie_prefs.note")}</small>
            </div>
          </div>

          <div className="cookie-prefs-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShow(false)}>
              {t("common.cancel")}
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              {t("common.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
