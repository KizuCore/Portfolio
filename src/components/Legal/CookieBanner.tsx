import "../../assets/styles/Legals/CookieBanner.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { updateConsent } from "../../utils/consent";

const LS_KEY = "cookie-consent";

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Affiche la bannière jusqu’à ce que le visiteur exprime son choix de consentement.
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) setVisible(true);
    const onConsentSaved = () => setVisible(false);
    window.addEventListener("cookie-consent-updated", onConsentSaved);
    return () => window.removeEventListener("cookie-consent-updated", onConsentSaved);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="region"
      aria-live="polite"
      aria-label={t("cookie_banner.aria_label")}
    >
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text mb-0">
          {t("cookie_banner.text")}
          {" "}
          <Link
            to="/politique-des-cookies"
            className="cookie-banner-link"
            aria-label={t("footer_links.aria_cookies_policy")}
          >
            {t("footer_links.cookies_policy")}
          </Link>
        </p>

        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-choice"
            onClick={() => {
              updateConsent(false);
              setVisible(false);
            }}
          >
            {t("cookie_banner.decline")}
          </button>

          <button
            type="button"
            className="cookie-choice"
            onClick={() => {
              updateConsent(true);
              setVisible(false);
            }}
          >
            {t("cookie_banner.accept")}
          </button>

          <button
            type="button"
            className="cookie-manage"
            onClick={() => window.openCookiePreferences?.()}
            aria-label={t("cookie_banner.manage")}
          >
            {t("cookie_banner.manage")}
          </button>
        </div>
      </div>
    </div>
  );
}
