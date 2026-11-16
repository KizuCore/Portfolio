import Presentation from "./Presentation";
import Qualifications from "./Qualifications";
import Hobbies from "./Hobbies";
import { useSecretSound } from "../hooks/useSecretSound";
import { JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import '../styles/ProfileInteractions.css';
import '../styles/About.css';
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { FiAward } from "@react-icons/all-files/fi/FiAward";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";

function AboutCard(): JSX.Element {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [selectedTab, setSelectedTab] = useState<'presentation' | 'qualifications' | 'hobbies'>('presentation');
  const handleSecretClick = useSecretSound();
  const tabs = [
    { key: 'presentation', icon: <FiUser />, label: t('presentation_title') },
    { key: 'qualifications', icon: <FiAward />, label: t('qualifications_title') },
    { key: 'hobbies', icon: <FiHeart />, label: t('hobbies_title') },
  ] as const;


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
              // Un seul arrêt de tabulation ; les flèches et les touches Début/Fin permettent de parcourir les onglets.
              const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
                : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length
                  : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
              if (next === null) return;
              event.preventDefault();
              setSelectedTab(tabs[next].key);
              document.getElementById(`about-tab-${tabs[next].key}`)?.focus();
            }}
          >
            <span className="profile-tab-icon" aria-hidden="true">{icon}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="about-profile-content">
        {tabs.map(({ key }) => (
          <motion.div
            key={key}
            role="tabpanel"
            id={`about-panel-${key}`}
            aria-labelledby={`about-tab-${key}`}
            hidden={selectedTab !== key}
            tabIndex={selectedTab === key ? 0 : -1}
            initial={false}
            animate={selectedTab === key ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : 8 }}
            transition={{ duration: reducedMotion ? 0 : .28 }}
          >
            {key === 'presentation' && <Presentation t={t} />}
            {key === 'qualifications' && <Qualifications t={t} />}
            {key === 'hobbies' && <Hobbies t={t} onSecretClick={handleSecretClick} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AboutCard;
