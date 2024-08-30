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
            {t('greeting')} <span className="blue">Théo Guérin</span>{t('from')}
            <span className="blue"> {t('rennes')}</span>.
            <br />
            <br />
            {t('current_position1')} <span className="blue">{t('developper23')}</span>{t('current_position2')} <span className="blue">{t('firstmaster')}</span>{t('current_position3')}
            <br />
            <br />
            {t('qualifications')}
            <br />
            <ul>
              <li className="about-activity">
                • <a href="https://istic.univ-rennes.fr/licence-informatique-parcours-informatique" style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                  {t('degree1')}
                </a>
              </li>
              
              <li className="about-activity">
                • <a href="https://www.mydigitalschool.com/bachelor-1-2-web" style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                  {t('degree2')}
                </a>
              </li>
              <li className="about-activity">
                • <a href="https://www.francecompetences.fr/recherche/rncp/37873/" style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                  {t('degree3')}
                </a>
              </li>

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
