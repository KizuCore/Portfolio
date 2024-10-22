import React from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home/home-main.webp";
import Particle from "../Utils/Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { useInView } from 'react-intersection-observer';

function Home() {
  const { t } = useTranslation();

  const { ref: refImg, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section>
      <Container fluid className="home-section pt-0" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            {/* Colonne pour le texte */}
            <Col md={7} className="home-header slide-in-left d-flex flex-column justify-content-center text-center text-md-left py-5">
              <h1 className="heading mb-3 title-font">
                {t('hello')}{" "}
                <span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
              </h1>
              <h2 className="heading-name mb-3 title-font">
                {t('iam')}
                <strong className="blue-title"> {t('name')}</strong>
              </h2>

              {/* Développeur... */}
              <div className="pt-3 blue-title d-flex justify-content-center align-items-center">
                <Type />
              </div>
            </Col>

            {/* Colonne pour l'image */}
            <Col md={5} className={`d-flex justify-content-center py-5 ${imgInView ? 'slide-in-right' : ''}`} ref={refImg}>
              <img
                src={homeLogo}
                alt={t('web_dev_illustration')} 
                className="img-fluid"
                style={{ maxHeight: "90%" }}
              />
            </Col>
          </Row>
          <Home2 />
        </Container>
      </Container>
    </section>
  );
}

export default Home;
