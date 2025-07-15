import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

function HomeStats() {
    const { ref, inView } = useInView({ triggerOnce: true });
    const { t } = useTranslation();

    return (
        <div className="home-stats" ref={ref}>

            <div className="stat-item stat-item-combo">
                <span className="stat-number bold-number">
                    {inView && <CountUp start={0} end={2} duration={1.5} delay={1.5} />}
                </span>
                <div className="stat-label-wrapper">
                    <span className="stat-label">{t('years')}</span>
                    <span className="stat-label">{t('experience_home')}</span>
                </div>
            </div>

            <div className="stat-item stat-item-combo">
                <span className="stat-number">
                    {inView && <CountUp start={0} end={5} duration={1.5} delay={1.7} />}
                </span>
                <div className="stat-label-wrapper">
                    <span className="stat-label">{t('years')}</span>
                    <span className="stat-label">{t('studies')}</span>
                </div>
            </div>

            <div className="stat-item stat-item-combo">
                <span className="stat-plus">+</span>
                <span className="stat-number bold-number">
                    {inView && <CountUp start={0} end={40} duration={2.5} delay={1.9} />}
                </span>
                <div className="stat-label-wrapper">
                    <span className="stat-label">{t('projects')}</span>
                    <span className="stat-label">{t('completed')}</span>
                </div>
            </div>

            <div className="stat-item stat-item-combo">
                <span className="stat-plus">+</span>
                <span className="stat-number bold-number">
                    {inView && <CountUp start={0} end={35} duration={2.5} delay={2.1} />}
                </span>
                <div className="stat-label-wrapper">
                    <span className="stat-label">{t('technologies')}</span>
                </div>
            </div>

        </div>
    );
}

export default HomeStats;
