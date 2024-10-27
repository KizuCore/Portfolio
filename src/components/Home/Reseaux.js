import React, { Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { Col } from "react-bootstrap";
import { useInView } from 'react-intersection-observer';
import '../../Assets/style/Reseaux/Reseaux.css';

// Chargement différé des icônes
const AiFillGithub = React.lazy(() => import("react-icons/ai").then(module => ({ default: module.AiFillGithub })));
const AiOutlineMail = React.lazy(() => import("react-icons/ai").then(module => ({ default: module.AiOutlineMail })));
const FaLinkedinIn = React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaLinkedinIn })));

function Reseaux() {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <Col md={12} className="home-about-social pt-5" ref={ref}>
            <h2 className="blue-title pt-5 pb-3">{t('social')}</h2>
            <p style={{ fontSize: "1.5em" }} className="py-4">
                {t('contact')} <span className="blue">{t('contact_me')}</span> !
            </p>
            <ul className="home-about-social-links">
                <li className={`social-icons ${inView ? 'fade-in' : ''}`}>
                    <a
                        href="https://github.com/Theo22100"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-colour home-social-icons"
                        aria-label={t('github_profile2')}
                    >
                        <Suspense fallback={<span>Loading...</span>}>
                            <AiFillGithub size={55} />
                        </Suspense>
                    </a>
                </li>
                <li className={`social-icons ${inView ? 'fade-in' : ''}`} style={{ animationDelay: "0.2s" }}>
                    <a
                        href="https://www.linkedin.com/in/théo-guérin-b20630192/"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-colour home-social-icons"
                        aria-label={t('linkedin_profile')}
                    >
                        <Suspense fallback={<span>Loading...</span>}>
                            <FaLinkedinIn size={55} />
                        </Suspense>
                    </a>
                </li>
                <li className={`social-icons ${inView ? 'fade-in' : ''}`} style={{ animationDelay: "0.4s" }}>
                    <a
                        href="mailto:theo.guerin35000@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-colour home-social-icons"
                        aria-label={t('email_me')}
                    >
                        <Suspense fallback={<span>Loading...</span>}>
                            <AiOutlineMail size={55} />
                        </Suspense>
                    </a>
                </li>
            </ul>
        </Col>
    );
}

export default Reseaux;
