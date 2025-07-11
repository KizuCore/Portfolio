import { JSX, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import { easeOut, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/About/About.css';
import secretSound from '@sound/voice.mp3';

function AboutCard(): JSX.Element {
  const { t } = useTranslation();
  const { ref: refText, inView: textInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [secretClickCount, setSecretClickCount] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(secretSound);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSecretClick = () => {
    if (!isCooldown) {
      setSecretClickCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (secretClickCount === 3 && audioRef.current) {
      audioRef.current.play();
      setSecretClickCount(0);
      setIsCooldown(true);
    }
  }, [secretClickCount]);

  useEffect(() => {
    if (isCooldown) {
      const timer = setTimeout(() => setIsCooldown(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [isCooldown]);

  return (
    <Card className="quote-card-view mt-4">
      <Card.Body>
        {isMobile ? (
          <blockquote
            ref={refText}
            className="blockquote mb-0 background-box"
          >
            <CardContent t={t} isMobile={isMobile} onSecretClick={handleSecretClick} />
          </blockquote>
        ) : (
          <motion.blockquote
            ref={refText}
            initial={{ opacity: 0, x: -50 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOut }}
            className="blockquote mb-0 background-box"
          >
            <CardContent t={t} isMobile={isMobile} onSecretClick={handleSecretClick} />
          </motion.blockquote>
        )}
      </Card.Body>
    </Card>
  );
}

function CardContent({
  t,
  isMobile,
  onSecretClick,
}: {
  t: any;
  isMobile: boolean;
  onSecretClick: () => void;
}): JSX.Element {
  return (
    <>
      <h2 className="mb-4 custom-title custom-title-2">{t('presentation_title')}</h2>
      <p className="text-justify">
        {t('greeting')} <span className="blue">Théo Guérin</span> {t('from')}
        <span className="blue"> Rennes, France</span>.
        <br />
        <br />
        {t('current_position1')} <span className="blue">{t('developperAge')}</span>
        {t('current_position2')} <span className="blue">{t('firstmaster')}</span>
        {t('current_position3')}
      </p>

      <h2 className="mt-4 custom-title custom-title-2">{t('qualifications_title')}</h2>
      <ul className={`mt-3 ${isMobile ? 'list-unstyled' : ''}`}>
        <li className="about-activity mb-2">
          • <a href="https://istic.univ-rennes.fr/licence-informatique-parcours-informatique" target="_blank" rel="noopener noreferrer" className="text-decoration-none blue">
            {t('degree1')}
          </a>
        </li>
        <li className="about-activity mb-2">
          • <a href="https://www.mydigitalschool.com/bachelor-1-2-web" target="_blank" rel="noopener noreferrer" className="text-decoration-none blue">
            {t('degree2')}
          </a>
        </li>
        <li className="about-activity mb-2">
          • <a href="https://www.francecompetences.fr/recherche/rncp/37873/" target="_blank" rel="noopener noreferrer" className="text-decoration-none blue">
            {t('degree3')}
          </a>
        </li>
      </ul>

      <h2 className="mt-4 custom-title custom-title-2">{t('hobbies_title')}</h2>
      <p className="text-justify mt-4">{t('outside_of_coding')}</p>
      <ul className={`mt-3 ${isMobile ? 'list-unstyled' : ''}`}>
        <li className="about-activity">✈️ • {t('hobby1')}</li>
        <li className="about-activity">🍳 • {t('hobby2')}</li>
        <li className="about-activity">🔭 • {t('hobby3')}</li>
        <li className="about-activity">🐈 • {t('hobby4')}</li>
        <li className="about-activity">
          <span onClick={onSecretClick} role="button" style={{ cursor: 'pointer' }}>
            🥂
          </span> • {t('hobby5')}
        </li>
      </ul>
    </>
  );
}

export default AboutCard;
