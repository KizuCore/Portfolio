import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { updateConsent } from "../../utils/consent";

const LS_KEY = "cookie-consent";

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="region"
      aria-live="polite"
      aria-label={t("cookie_banner.aria_label", "Bandeau d'information sur les cookies")}
    >
      <div className="container cookie-banner-inner">
        <p className="cookie-banner-text mb-0">
          {t("cookie_banner.text")}
          <Link
            to="/politique-de-confidentialite"
            className="cookie-banner-link"
            aria-label={t("footer_links.aria_privacy", "Politique de confidentialite")}
          >
            {t("footer_links.privacy", "Politique de confidentialite")}
          </Link>
        </p>

        <div className="cookie-banner-actions">
          <button
            className="btn btn-light btn-sm"
            onClick={() => {
              updateConsent(false);
              setVisible(false);
            }}
          >
            {t("cookie_banner.decline")}
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              updateConsent(true);
              setVisible(false);
            }}
          >
            {t("cookie_banner.accept")}
          </button>

          <button
            type="button"
            className="btn btn-link btn-sm p-0 align-baseline cookie-banner-link"
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
