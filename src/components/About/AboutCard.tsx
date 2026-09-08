import { JSX, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from "i18next";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/About/About.css';
import secretSound from '@sound/voice.mp3';
import { FaGraduationCap } from "@react-icons/all-files/fa/FaGraduationCap";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaPuzzlePiece } from "@react-icons/all-files/fa/FaPuzzlePiece";

function AboutCard(): JSX.Element {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedTab, setSelectedTab] = useState<'presentation' | 'qualifications' | 'hobbies'>('presentation');
  const [secretClickCount, setSecretClickCount] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tabs = [
    { key: 'presentation', icon: <FaUser />, label: t('presentation_title') },
    { key: 'qualifications', icon: <FaGraduationCap />, label: t('qualifications_title') },
    { key: 'hobbies', icon: <FaPuzzlePiece />, label: t('hobbies_title') },
  ] as const;

  useEffect(() => {
    const audio = new Audio(secretSound);
    audioRef.current = audio;
    return () => { audio.pause(); audioRef.current = null; };
  }, []);

  useEffect(() => {
    if (secretClickCount === 3 && audioRef.current) {
      void audioRef.current.play().catch(() => { /* Audio may be blocked by browser settings. */ });
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
    <div className="about-profile">
      <div className="about-profile-tabs" role="tablist" aria-label={t('about_me')}>
        {tabs.map(({ key, icon, label }, index) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`about-tab-${key}`}
            aria-controls={`about-panel-${key}`}
            aria-selected={selectedTab === key}
            tabIndex={selectedTab === key ? 0 : -1}
            onClick={() => setSelectedTab(key)}
            onKeyDown={(event) => {
              // A single tab stop; arrows and Home/End navigate the tab group.
              const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
                : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length
                : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
              if (next === null) return;
              event.preventDefault();
              setSelectedTab(tabs[next].key);
              document.getElementById(`about-tab-${tabs[next].key}`)?.focus();
            }}
          >
            <span aria-hidden="true">{icon}</span> {label}
          </button>
        ))}
      </div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="about-profile-content"
      >
        {tabs.map(({ key }) => (
          <div
            key={key}
            role="tabpanel"
            id={`about-panel-${key}`}
            aria-labelledby={`about-tab-${key}`}
            hidden={selectedTab !== key}
            tabIndex={0}
          >
            {key === 'presentation' && <Presentation t={t} />}
            {key === 'qualifications' && <Qualifications t={t} />}
            {key === 'hobbies' && <Hobbies t={t} onSecretClick={handleSecretClick} />}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Presentation({ t }: { t: TFunction }): JSX.Element {
  return (
    <>
      <p className="about-profile-lead">
        {t('greeting')} <strong className="profile-emphasis">Théo Guérin</strong> {t('from')}
         {t('rennes')}.
      </p>
      <p>
        {t('current_position1')} <strong className="profile-emphasis">{t('developperAge')}</strong>
        {t('current_position2')} <span className="profile-accent">{t('firstmaster')}</span>
        {t('current_position3')}
      </p>
      <p>
        {t('presentation.text_1')}<strong className="profile-emphasis">{t('presentation.text_bold_1')}</strong>{t('presentation.text_2')}{t('presentation.text_bold_2')}{t('presentation.text_3')}{t('presentation.text_bold_3')}{t('presentation.text_4')}<strong className="profile-emphasis">{t('presentation.text_bold_4')}</strong>{t('presentation.text_5')}
      </p>
    </>
  );
}

function Qualifications({ t }: { t: TFunction }): JSX.Element {
  return (
    <ul className="qualification-list">
      <li><a href="https://www.francecompetences.fr/recherche/RNCP/40150/" target="_blank" rel="noopener noreferrer" className="qualification-link"><span>{t('degree5')}</span><span className="qualification-arrow" aria-hidden="true">&#8599;</span></a></li>
      <li><a href="https://istic.univ-rennes.fr/licence-informatique-parcours-informatique" target="_blank" rel="noopener noreferrer" className="qualification-link"><span>{t('degree1')}</span><span className="qualification-arrow" aria-hidden="true">&#8599;</span></a></li>
      <li><a href="https://www.mydigitalschool.com/bachelor-1-2-web" target="_blank" rel="noopener noreferrer" className="qualification-link"><span>{t('degree2')}</span><span className="qualification-arrow" aria-hidden="true">&#8599;</span></a></li>
      <li><a href="https://www.francecompetences.fr/recherche/rncp/37873/" target="_blank" rel="noopener noreferrer" className="qualification-link"><span>{t('degree3')}</span><span className="qualification-arrow" aria-hidden="true">&#8599;</span></a></li>
      <li><a href="https://cyber.gouv.fr/offre-de-service/formations-entrainement-et-decouverte-des-metiers/formations/formations-delivrees-par-lanssi/mooc-secnumacademie/" target="_blank" rel="noopener noreferrer" className="qualification-link"><span>{t('degree4')}</span><span className="qualification-arrow" aria-hidden="true">&#8599;</span></a></li>
    </ul>
  );
}

function Hobbies({ t, onSecretClick }: { t: TFunction; onSecretClick: () => void }): JSX.Element {
  return (
    <>
      <p >{t('outside_of_coding')}</p>
      <div className="hobbies-list">
        <span className="hobby">✈️ {t('hobby1')}</span>
        <span className="hobby">🍳 {t('hobby2')}</span>
        <span className="hobby">🔭 {t('hobby3')}</span>
        <span className="hobby">🐈 {t('hobby4')}</span>
        <button type="button" className="hobby secret" onClick={onSecretClick}>🥂 {t('hobby5')}</button>
        <span className="hobby">🎮 {t('hobby6')}</span>
        <span className="hobby">🍿 {t('hobby7')}</span>
      </div>
    </>
  );
}

export default AboutCard;
