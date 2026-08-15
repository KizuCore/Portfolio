import { FaDownload } from "@react-icons/all-files/fa/FaDownload";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SITE_PROFILE, SOCIAL_LINKS } from "../../config/site";
import IconLink from "../Common/IconLink";

function HomeButtons() {
  const { t } = useTranslation();

  return (
    <div className="hero-buttons-wrapper">
      <div className="cv-button-wrapper">
        <Link to="/cv" className="cv-btn">
          <span>
            {t("my")} {t("cv")}
          </span>
          <FaDownload className="cv-icon" aria-hidden="true" />
        </Link>
      </div>

      <div className="icon-buttons-wrapper">
        <IconLink href={SOCIAL_LINKS.github} icon={FaGithub} className="icon-btn" ariaLabel={t("github_profile_link")} />
        <IconLink
          href={SOCIAL_LINKS.linkedin}
          icon={FaLinkedin}
          className="icon-btn"
          ariaLabel={t("linkedin_profile_link")}
        />
        <IconLink
          href={`mailto:${SITE_PROFILE.email}`}
          icon={FaEnvelope}
          className="icon-btn"
          ariaLabel={t("email_link")}
          external={false}
        />
      </div>
    </div>
  );
}

export default HomeButtons;
