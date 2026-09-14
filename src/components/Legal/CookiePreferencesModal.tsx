import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getConsent, updateConsent } from "../../utils/consent";
import "../../assets/styles/Legals/CookiePreferences.css";

export default function CookiePreferencesModal() {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  useEffect(() => {
    // Expose une petite passerelle impérative pour les liens situés hors du contexte de routage React.
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

    const previousFocus = document.activeElement as HTMLElement | null;
    const controls = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button, input') ?? []);
    controls()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    // Bloque la page derrière la fenêtre modale et permet de la fermer avec Échap, comme une fenêtre native.
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const items = controls();
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.key === "Escape") {
        setShow(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
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
        tabIndex={-1}
        aria-label={t("common.close")}
        onClick={() => setShow(false)}
      />

      <div
        ref={dialogRef}
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
              aria-label={t("common.close")}
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
                  className="cookie-prefs-checkbox"
                  aria-describedby="cookie-prefs-note"
                  checked={analyticsOn}
                  onChange={(event) => setAnalyticsOn(event.currentTarget.checked)}
                />
                <span>{t("cookie_prefs.analytics_label")}</span>
              </label>

              <small id="cookie-prefs-note" className="cookie-prefs-note">{t("cookie_prefs.note")}</small>
            </div>
          </div>

          <div className="cookie-prefs-footer">
            <button type="button" className="cookie-prefs-cancel" onClick={() => setShow(false)}>
              {t("common.cancel")}
            </button>
            <button type="button" className="cookie-prefs-save" onClick={handleSave}>
              {t("common.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
