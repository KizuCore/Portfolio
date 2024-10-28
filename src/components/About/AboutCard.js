import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Card from "react-bootstrap/Card";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import secretSound from '../../Assets/sound/voice.mp3'; 
import SoundPlayer from "../Utils/SoundPlayer";
import '../../Assets/style/About/About.css'; 

function AboutCard() {
  const { t } = useTranslation();
  const { ref: refText, inView: textInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const [secretClickCount, setSecretClickCount] = useState(0); // État compter les clics
  const [isCooldown, setIsCooldown] = useState(false); // État gérer le cooldown
  const { playSound } = SoundPlayer({ soundSrc: secretSound });

  // Fonction gère clics
  const handleSecretClick = () => {
    if (!isCooldown) {
      setSecretClickCount(prevCount => prevCount + 1);
    }
  };

  // Jouer le son 3 clics
  useEffect(() => {
    if (secretClickCount === 3) {
      playSound();
      setSecretClickCount(0); 
      setIsCooldown(true); 
    }
  }, [secretClickCount, playSound]);

  // Désactiver cooldown 7sec
  useEffect(() => {
    if (isCooldown) {
      const cooldownTimer = setTimeout(() => {
        setIsCooldown(false);
      }, 7000);
      return () => clearTimeout(cooldownTimer);
    }
  }, [isCooldown]);

  const [isMobile] = useState(window.innerWidth <= 768);


  return (
    <Card className="quote-card-view mt-4">
      <Card.Body>
        <motion.blockquote
          initial={{ opacity: 0, x: -50 }}
          animate={textInView  ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="blockquote mb-0 background-box"
          ref={refText}
        >
          {/* Présentation */}
          <h3 className="light-blue-title mb-4" style={{ fontSize: "1.4em" }}>{t('presentation_title')}</h3>
          <p className="text-justify">
            {t('greeting')} <span className="blue">Théo Guérin</span>{t('from')}<span className="blue"> Rennes, France</span>.
            <br />
            <br />
            {t('current_position1')} <span className="blue">{t('developper23')}</span>{t('current_position2')} <span className="blue">{t('firstmaster')}</span>{t('current_position3')}
            <br />
          </p>

          {/* Qualifications */}
          <h3 className="light-blue-title mt-4" style={{ fontSize: "1.4em" }}>{t('qualifications_title')}</h3>

          <ul className={`mt-3 ${isMobile ? 'list-unstyled ' : ''}`}>
            <li className="about-activity mb-2">
              • <a
                href="https://istic.univ-rennes.fr/licence-informatique-parcours-informatique"
                className="text-decoration-none blue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('degree1_aria')}
              >
                {t('degree1')}
              </a>
            </li>
            <li className="about-activity mb-2">
              • <a
                href="https://www.mydigitalschool.com/bachelor-1-2-web"
                className="text-decoration-none blue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('degree2_aria')}
              >
                {t('degree2')}
              </a>
            </li>
            <li className="about-activity mb-2">
              • <a
                href="https://www.francecompetences.fr/recherche/rncp/37873/"
                className="text-decoration-none blue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('degree3_aria')}
              >
                {t('degree3')}
              </a>
            </li>
          </ul>

          {/* Hobbies */}
          <h3 className="light-blue-title mt-4" style={{ fontSize: "1.4em" }}>{t('hobbies_title')}</h3>

          <p className="text-justify mt-4">
            {t('outside_of_coding')}
          </p>
          <ul className={`mt-3 ${isMobile ? 'list-unstyled ' : ''}`}>
            <li className="about-activity">✈️ • {t('hobby1')}</li>
            <li className="about-activity">🍳 • {t('hobby2')}</li>
            <li className="about-activity">🔭 • {t('hobby3')}</li>
            <li className="about-activity">🐈 • {t('hobby4')}</li>
            <li className="about-activity"><span  onClick={handleSecretClick}>🥂</span> • {t('hobby5')}</li> 
          </ul>
        </motion.blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
