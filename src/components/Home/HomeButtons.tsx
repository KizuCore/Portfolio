import { FaDownload } from "@react-icons/all-files/fa/FaDownload";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { SITE_PROFILE, SOCIAL_LINKS } from "../../config/site";

function HomeButtons() {
    const { t } = useTranslation();

    return (
        <div className="hero-buttons-wrapper">
            {/* Bouton CV */}
            <div className="cv-button-wrapper">
                <Link to="/cv" className="cv-btn">
                    <span>{t('my')} {t('cv')}</span>
                    <FaDownload className="cv-icon" />
                </Link>
            </div>

            {/* Icônes réseaux */}
            <div className="icon-buttons-wrapper">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={t("github_profile_link")}>
                    <FaGithub size={20} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={t("linkedin_profile_link")}>
                    <FaLinkedin size={20} />
                </a>
                <a href={`mailto:${SITE_PROFILE.email}`} className="icon-btn" aria-label={t("email_link")}>
                    <FaEnvelope size={20} />
                </a>
            </div>
        </div>
    );
}


export default HomeButtons;
