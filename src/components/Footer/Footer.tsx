import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { FiMail } from "@react-icons/all-files/fi/FiMail";
import { FiMapPin } from "@react-icons/all-files/fi/FiMapPin";
import { FiGithub } from "@react-icons/all-files/fi/FiGithub";
import { FiGitlab } from "@react-icons/all-files/fi/FiGitlab";
import { FiLinkedin } from "@react-icons/all-files/fi/FiLinkedin";
import { Link } from "react-router-dom";
import logo from "@image/logodev.svg";
import IconLink from "../Common/IconLink";
import { SITE_PROFILE, SOCIAL_LINKS } from "../../config/site";
import "../../assets/styles/Footer/Footer.css";

function Footer(): JSX.Element {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const pageLinks = [
    { to: "/", label: t("home") },
    { to: "/about", label: t("about") },
    { to: "/project", label: t("project") },
    { to: "/experience", label: t("experience") },
    { to: "/cv", label: t("resume") },
    { to: "/contact", label: t("social") },
  ];

  return (
    <footer className="footer-section">
      <div className="footer-shell">
        <div className="footer-grid" role="navigation" aria-label={t("footer_navigation")}>
          <div className="footer-brand-column">
            <div className="footer-brand-title-wrap">
              <img src={logo} alt={t("brand")} className="footer-brand-logo" loading="lazy" decoding="async" />
              <span className="footer-brand-title">{SITE_PROFILE.brandName}</span>
            </div>

            <p className="footer-contact-line footer-location">
              <FiMapPin aria-hidden="true" />
              <span>
                {SITE_PROFILE.postalCode} {SITE_PROFILE.city},
                <br />
                France
              </span>
            </p>

            <a
              className="footer-contact-line footer-external-link"
              href={`mailto:${SITE_PROFILE.email}`}
              aria-label={SITE_PROFILE.email}
            >
              <FiMail aria-hidden="true" />
              <span>{SITE_PROFILE.email}</span>
            </a>
          </div>

          <div className="footer-link-column">
            <p className="footer-column-title">{t("footer_products_title")}</p>
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
            <p className="footer-column-title">{t("footer_social_title")}</p>
            <ul>
              <li>
                <IconLink
                  href={SOCIAL_LINKS.github}
                  className="footer-nav-link"
                  ariaLabel={t("github_profile_link")}
                  icon={FiGithub}
                  iconClassName="footer-nav-icon"
                >
                  GitHub
                </IconLink>
              </li>
              <li>
                <IconLink
                  href={SOCIAL_LINKS.gitlab}
                  className="footer-nav-link"
                  ariaLabel={t("gitlab_profile_link")}
                  icon={FiGitlab}
                  iconClassName="footer-nav-icon"
                >
                  GitLab
                </IconLink>
              </li>
              <li>
                <IconLink
                  href={SOCIAL_LINKS.linkedin}
                  className="footer-nav-link"
                  ariaLabel={t("linkedin_profile_link")}
                  icon={FiLinkedin}
                  iconClassName="footer-nav-icon"
                >
                  LinkedIn
                </IconLink>
              </li>
            </ul>
          </div>

          <div className="footer-link-column">
            <p className="footer-column-title">{t("footer_legal_title")}</p>
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
                <Link to="/politique-des-cookies" className="footer-nav-link" aria-label={t("footer_links.aria_cookies_policy")}>
                  {t("footer_links.cookies_policy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {"\u00A9"} 2024-{year} {SITE_PROFILE.brandName}. {t("footer_rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
