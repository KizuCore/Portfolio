import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import CountUp from 'react-countup';

function HomeStats() {
  const { t } = useTranslation();
  const section = useRef<HTMLDivElement>(null);
  const visible = useInView(section, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const stats = [
    { value: 2, labels: [t('years'), t('experience_home')] },
    { value: 5, labels: [t('years'), t('studies')] },
    { value: 40, prefix: '+', labels: [t('projects'), t('completed')] },
    { value: 37, prefix: '+', labels: [t('technologies')] },
  ];

  return (
    <div className="home-stats" ref={section}>
      <div className="row g-3 g-md-5 justify-content-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="col-6 col-md-3 d-flex justify-content-center"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={visible || reduceMotion ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.3 }}
          >
            {/* Announce the final figure once, rather than every counting frame. */}
            <span className="visually-hidden">{stat.prefix}{stat.value} {stat.labels.join(' ')}</span>
            <div className="stat-item stat-item-combo" aria-hidden="true">
              {stat.prefix && <span className="stat-plus">{stat.prefix}</span>}
              <span className="stat-number bold-number" style={{ minWidth: `${String(stat.value).length}ch`, fontVariantNumeric: 'tabular-nums' }}>
                {reduceMotion ? stat.value : visible ? (
                  <CountUp start={0} end={stat.value} delay={index * 0.3} duration={1.6} useEasing={false} />
                ) : 0}
              </span>
              <div className="stat-label-wrapper">
                {stat.labels.map((label, labelIndex) => <span className="stat-label" key={labelIndex}>{label}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HomeStats;
