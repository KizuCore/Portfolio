import React from "react";
import { useTranslation } from 'react-i18next';
import { Col } from "react-bootstrap";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useInView } from 'react-intersection-observer';

function Reseaux() {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <Col md={12} className="home-about-social pt-5" ref={ref}>
            <h2 className="title-font pb-3">{t('social')}</h2>
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
                        <AiFillGithub size={55} />
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
                        <FaLinkedinIn size={55} />
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
                        <AiOutlineMail size={55} />
                    </a>
                </li>
            </ul>
        </Col>
    );
}

export default Reseaux;
