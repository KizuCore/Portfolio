import React from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/logo.webp";
import Tilt from "react-parallax-tilt";
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
      <Container fluid className="about-section pt-0" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center" style={{ paddingBottom: "12em",paddingTop: "6em" }}>
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
              <Tilt>
                <img
                  src={myImg}
                  className={`img-fluid ${imgInView ? 'slide-in-right' : ''}`}
                  ref={refImg}
                  alt={t('theo_developer')}
                  style={{ height: "16em" }}
                  loading="lazy"
                />
              </Tilt>
            </Col>
          </Row>
          <Home2 />
        </Container>
      </Container>
    </section>
  );
}

export default Home;
