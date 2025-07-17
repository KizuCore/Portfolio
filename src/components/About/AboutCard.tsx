import { JSX, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import { easeOut, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/About/About.css';
import secretSound from '@sound/voice.mp3';
import { FaGraduationCap, FaUser, FaPuzzlePiece } from 'react-icons/fa';

function AboutCard(): JSX.Element {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedTab, setSelectedTab] = useState<'presentation' | 'qualifications' | 'hobbies'>('presentation');
  const [secretClickCount, setSecretClickCount] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(secretSound);
  }, []);

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

  const handleSecretClick = () => {
    if (!isCooldown) setSecretClickCount((prev) => prev + 1);
  };

  return (
    <div className='background-box '>
      <Card className="quote-card-view">
        <Card.Body>
          <div className="about-tabs">
            {[
              { key: 'presentation', icon: <FaUser />, label: t('presentation_title') },
              { key: 'qualifications', icon: <FaGraduationCap />, label: t('qualifications_title') },
              { key: 'hobbies', icon: <FaPuzzlePiece />, label: t('hobbies_title') },
            ].map(({ key, icon, label }) => (
              <motion.button
                key={key}
                onClick={() => setSelectedTab(key as typeof selectedTab)}
                className={selectedTab === key ? 'active' : ''}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: easeOut }}
              >
                {icon} {label}
              </motion.button>
            ))}
          </div>


          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOut }}
            className="minheight-about"
          >
            {selectedTab === 'presentation' && <Presentation t={t} />}
            {selectedTab === 'qualifications' && <Qualifications t={t} />}
            {selectedTab === 'hobbies' && <Hobbies t={t} onSecretClick={handleSecretClick} />}
          </motion.div>
        </Card.Body>
      </Card>
    </div>
  );
}

function Presentation({ t }: { t: any }): JSX.Element {
  return (
    <>
      <p className="text-justify pt-1 pt-md-4">
        {t('greeting')} <span className="blue">Théo Guérin</span> {t('from')}
        <span className="blue"> Rennes, France</span>.
        <br /><br />
        {t('current_position1')} <span className="blue">{t('developperAge')}</span>
        {t('current_position2')} <span className="blue">{t('firstmaster')}</span>
        {t('current_position3')}
      </p>
      <p className="text-justify">
        {t('present_1')}{' '}<span className="blue">{t('present_2')}</span>{t('present_3')}
      </p>
    </>
  );
}

function Qualifications({ t }: { t: any }): JSX.Element {
  return (
    <div className="grid-qualifs mt-3">
      <a href="https://istic.univ-rennes.fr/licence-informatique-parcours-informatique" target="_blank" rel="noopener noreferrer" className="qualif-link">{t('degree1')}</a>
      <a href="https://www.mydigitalschool.com/bachelor-1-2-web" target="_blank" rel="noopener noreferrer" className="qualif-link">{t('degree2')}</a>
      <a href="https://www.francecompetences.fr/recherche/rncp/37873/" target="_blank" rel="noopener noreferrer" className="qualif-link">{t('degree3')}</a>
      <a href="https://cyber.gouv.fr/comprendre-la-certification" target="_blank" rel="noopener noreferrer" className="qualif-link">{t('degree4')}</a>
    </div>
  );
}

function Hobbies({ t, onSecretClick }: { t: any; onSecretClick: () => void }): JSX.Element {
  return (
    <>
      <p className="text-justify mt-4 pt-0 pt-md-4 pb-0 pb-md-4">{t('outside_of_coding')}</p>
      <div className="hobbies-list">
        <span className="hobby">✈️ {t('hobby1')}</span>
        <span className="hobby">🍳 {t('hobby2')}</span>
        <span className="hobby">🔭 {t('hobby3')}</span>
        <span className="hobby">🐈 {t('hobby4')}</span>
        <span className="hobby secret" onClick={onSecretClick} role="button">🥂 {t('hobby5')}</span>
        <span className="hobby">🎮 {t('hobby6')}</span>
        <span className="hobby">🍿 {t('hobby7')}</span>
      </div>
    </>
  );
}

export default AboutCard;
