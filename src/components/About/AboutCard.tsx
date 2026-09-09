import { JSX, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from "i18next";
import { motion, useReducedMotion } from 'framer-motion';
import { MinecraftMemory } from './ProfileInteractions';
import HobbyArtwork from './HobbyArtwork';
import '../../assets/styles/About/ProfileInteractions.css';
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/About/About.css';
import secretSound from '@sound/voice.mp3';
import { FaGraduationCap } from "@react-icons/all-files/fa/FaGraduationCap";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaPuzzlePiece } from "@react-icons/all-files/fa/FaPuzzlePiece";

function AboutCard(): JSX.Element {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
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
            {selectedTab === key && <motion.i className="profile-tab-indicator" layoutId="profile-tab-indicator" transition={{ duration: reducedMotion ? 0 : .28, ease: "easeInOut" }} />}
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
          <motion.div
            key={key}
            role="tabpanel"
            id={`about-panel-${key}`}
            aria-labelledby={`about-tab-${key}`}
            hidden={selectedTab !== key}
            tabIndex={0}
            initial={false}
            animate={selectedTab === key ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : 8 }}
            transition={{ duration: reducedMotion ? 0 : .28 }}
          >
            {key === 'presentation' && <Presentation t={t} />}
            {key === 'qualifications' && <Qualifications t={t} />}
            {key === 'hobbies' && <Hobbies t={t} onSecretClick={handleSecretClick} />}
          </motion.div>
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
        {t('presentation.text_1')}<MinecraftMemory />{t('presentation.text_2')}{t('presentation.text_bold_2')}{t('presentation.text_3')}{t('presentation.text_bold_3')}{t('presentation.text_4')}<strong className="profile-emphasis">{t('presentation.text_bold_4')}</strong>{t('presentation.text_5')}
      </p>
    </>
  );
}

function Qualifications({ t }: { t: TFunction }): JSX.Element {
  const degrees = [
    { key: 'degree5', date: '2024 — 2026', field: 'Full-Stack · RNCP 7', href: 'https://www.francecompetences.fr/recherche/RNCP/40150/' },
    { key: 'degree2', date: '2023 — 2024', field: 'Web · MyDigitalSchool', href: 'https://www.mydigitalschool.com/bachelor-1-2-web' },
    { key: 'degree1', date: '2020 — 2023', field: t('about_interactions.computing') + ' · ISTIC', href: 'https://istic.univ-rennes.fr/licence-informatique-parcours-informatique' },
    { key: 'degree3', date: 'RNCP', field: t('about_interactions.applications'), href: 'https://www.francecompetences.fr/recherche/rncp/37873/' },
    { key: 'degree4', date: 'ANSSI', field: t('about_interactions.security'), href: 'https://cyber.gouv.fr/offre-de-service/formations-entrainement-et-decouverte-des-metiers/formations/formations-delivrees-par-lanssi/mooc-secnumacademie/' },
  ];
  return <ul className="profile-degree-grid">{degrees.map(({ key, date, field, href }) => <li key={key}>
    <a className="profile-degree-card" href={href} target="_blank" rel="noopener noreferrer">
      <span className="profile-degree-meta"><span>{date}</span><FaGraduationCap aria-hidden="true" /></span>
      <strong>{t(key)}</strong><span className="profile-degree-field">{field}<span aria-hidden="true">↗</span></span>
    </a>
  </li>)}</ul>;
}

function Hobbies({ t, onSecretClick }: { t: TFunction; onSecretClick: () => void }): JSX.Element {
  const hobbies = [
    { symbol: '✈️', index: 0 },
    { symbol: '🔭', index: 2 },
    { symbol: '🐈', index: 3 },
    { symbol: '🥂', index: 4 },
    { symbol: '🎮', index: 5 },
    { symbol: '🧩', index: 7 },
  ];
  return <>
    <p className="hobbies-intro">{t('outside_of_coding')}</p>
    <div className="profile-hobby-grid">{hobbies.map(({ symbol, index }) => <article key={symbol} className="profile-hobby-card" data-hobby={index}>
      <div className="profile-hobby-banner">
        <h3 className="profile-hobby-heading">
          {index === 4 ? <button type="button" className="profile-hobby-secret" onClick={onSecretClick}><strong>{t(`hobby${index + 1}`)}</strong></button>
            : <strong>{t(`hobby${index + 1}`)}</strong>}
        </h3>
        <HobbyArtwork index={index} />
      </div>
      <span className="profile-hobby-detail">{t(`about_interactions.hobby_details.${index + 1}`)}</span>
    </article>)}</div>
  </>;
}

export default AboutCard;
