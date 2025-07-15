import { FaDownload, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function HomeButtons() {
    const { t } = useTranslation();
    return (
        <div className="hero-buttons-style">
            {/* Bouton CV */}
            <Link to="/cv" className="cv-btn">
                <span>{t('my')}{" "}{t('cv')}</span>
                <FaDownload className="cv-icon" />
            </Link>

            {/* Bouton GitHub */}
            <a
                href="https://github.com/Theo22100"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub"
            >
                <FaGithub size={20} />
            </a>

            {/* Bouton LinkedIn */}
            <a
                href="https://www.linkedin.com/in/theo-guerin35"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn"
            >
                <FaLinkedin size={20} />
            </a>

            {/* Bouton Email */}
            <a
                href="mailto:theo.guerin35000@gmail.com"
                className="icon-btn"
                aria-label="Email"
            >
                <FaEnvelope size={20} />
            </a>
        </div>
    );
}

export default HomeButtons;
