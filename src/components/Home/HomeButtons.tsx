import { FaDownload, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

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
                <a href="https://github.com/KizuCore" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
                    <FaGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/theo-guerin35" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
                    <FaLinkedin size={20} />
                </a>
                <a href="mailto:theo.guerin35000@gmail.com" className="icon-btn" aria-label="Email">
                    <FaEnvelope size={20} />
                </a>
            </div>
        </div>
    );
}


export default HomeButtons;
