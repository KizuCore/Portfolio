import React from "react";
import { useTranslation } from 'react-i18next';
import Card from "react-bootstrap/Card";

function AboutCard() {
  const { t } = useTranslation();

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {t('greeting')} <span className="blue">Théo Guérin</span> {t('from')}
            <span className="blue"> Rennes, France.</span>
            <br />
            <br />
            {t('current_position')}
            <br />
            <br />
            {t('qualifications')}
            <br />
            <ul>
              <li className="about-activity">{t('degree1')}</li>
              <li className="about-activity">{t('degree2')}</li>
              <li className="about-activity">{t('degree3')}</li>
            </ul>
            <br />
            {t('outside_of_coding')}
          </p>
          <ul>
            <li className="about-activity">{t('hobby1')}</li>
            <li className="about-activity">{t('hobby2')}</li>
            <li className="about-activity">{t('hobby3')}</li>
            <li className="about-activity">{t('hobby4')}</li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
