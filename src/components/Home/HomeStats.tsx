import { useTranslation } from 'react-i18next';

// Display the existing figures immediately, including when reduced motion is enabled.
function HomeStats() {
  const { t } = useTranslation();

  return (
    <div className="home-stats">
      <div className="row g-3 g-md-5 justify-content-center">
        <div className="col-6 col-md-3 d-flex justify-content-center">
          <div className="stat-item stat-item-combo">
            <span className="stat-number bold-number">
              2
            </span>
            <div className="stat-label-wrapper">
              <span className="stat-label">{t('years')}</span>
              <span className="stat-label">{t('experience_home')}</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 d-flex justify-content-center">
          <div className="stat-item stat-item-combo">
            <span className="stat-number">
              5
            </span>
            <div className="stat-label-wrapper">
              <span className="stat-label">{t('years')}</span>
              <span className="stat-label">{t('studies')}</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 d-flex justify-content-center">
          <div className="stat-item stat-item-combo">
            <span className="stat-plus">+</span>
            <span className="stat-number bold-number">
              40
            </span>
            <div className="stat-label-wrapper">
              <span className="stat-label">{t('projects')}</span>
              <span className="stat-label">{t('completed')}</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 d-flex justify-content-center">
          <div className="stat-item stat-item-combo">
            <span className="stat-plus">+</span>
            <span className="stat-number bold-number">
              37
            </span>
            <div className="stat-label-wrapper">
              <span className="stat-label">{t('technologies')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStats;
