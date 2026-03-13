import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { FiMail } from "@react-icons/all-files/fi/FiMail";
import { FiMapPin } from "@react-icons/all-files/fi/FiMapPin";
import { FiGithub } from "@react-icons/all-files/fi/FiGithub";
import { FiLinkedin } from "@react-icons/all-files/fi/FiLinkedin";
import { Link } from "react-router-dom";
import logo from "@image/logodev.svg";
import "../../assets/styles/Footer/Footer.css";

function Footer(): JSX.Element {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const pageLinks = [
    { to: "/", label: t("home", { defaultValue: "Accueil" }) },
    { to: "/about", label: t("about", { defaultValue: "A propos" }) },
    { to: "/project", label: t("project", { defaultValue: "Projets" }) },
    { to: "/experience", label: t("experience", { defaultValue: "Experience" }) },
    { to: "/cv", label: t("resume", { defaultValue: "CV" }) },
    { to: "/contact", label: t("social", { defaultValue: "Contact" }) },
  ];

  return (
    <footer className="footer-section">
      <div className="footer-shell">
        <div className="footer-grid" role="navigation" aria-label={t("footer_navigation", { defaultValue: "Navigation de pied de page" })}>
          <div className="footer-brand-column">
            <div className="footer-brand-title-wrap">
              <img src={logo} alt={t("brand", { defaultValue: "KizuCore" })} className="footer-brand-logo" loading="lazy" decoding="async" />
              <span className="footer-brand-title">KizuCore</span>
            </div>

            <p className="footer-contact-line footer-location">
              <FiMapPin aria-hidden="true" />
              <span>
                35700 Rennes,
                <br />
                France
              </span>
            </p>

            <a className="footer-contact-line footer-external-link" href="mailto:theo.guerin35000@gmail.com" aria-label="theo.guerin35000@gmail.com">
              <FiMail aria-hidden="true" />
              <span>theo.guerin35000@gmail.com</span>
            </a>
          </div>

          <div className="footer-link-column">
            <h3>{t("footer_products_title", { defaultValue: "Pages" })}</h3>
            <ul className="footer-pages-list">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-link-column">
            <h3>{t("footer_social_title", { defaultValue: "Réseaux" })}</h3>
            <ul>
              <li>
                <a
                  href="https://github.com/KizuCore"
                  className="footer-nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("github_profile_link", { defaultValue: "Profil GitHub" })}
                >
                  <FiGithub aria-hidden="true" style={{ marginRight: "0.45rem", verticalAlign: "middle" }} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/theo-guerin35/"
                  className="footer-nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("linkedin_profile_link", { defaultValue: "Profil LinkedIn" })}
                >
                  <FiLinkedin aria-hidden="true" style={{ marginRight: "0.45rem", verticalAlign: "middle" }} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-link-column">
            <h3>{t("footer_legal_title", { defaultValue: "Légal" })}</h3>
            <ul>
              <li>
                <Link to="/mentions-legales" className="footer-nav-link" aria-label={t("footer_links.aria_legal")}>
                  {t("footer_links.legal")}
                </Link>
              </li>
              <li>
                <Link
                  to="/politique-de-confidentialite"
                  className="footer-nav-link"
                  aria-label={t("footer_links.aria_privacy")}
                >
                  {t("footer_links.privacy")}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link footer-link-button"
                  onClick={() => window.openCookiePreferences?.()}
                  aria-label={t("footer_links.aria_cookies")}
                >
                  {t("footer_links.cookies")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {"\u00A9"} 2024-{year} KizuCore. {t("footer_rights", { defaultValue: "Tous droits réservés." })}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
