import { JSX } from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import { motion } from 'framer-motion';

import LogoDeveloper from "../../assets/images/logodev.svg"
import Tilt from "react-parallax-tilt";
import Particle from "../Utils/Particle.js";
import TypeDev from "./Type.tsx";
import '../../assets/styles/Home/Home.css';
import { useInView } from 'react-intersection-observer';

function Home(): JSX.Element {
  const { t } = useTranslation();

  const { inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section>
      <Container fluid className="about-section pt-0" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center justify-content-center text-center text-md-left" style={{ paddingBottom: "15em", paddingTop: "4em" }}>
            {/* Texte */}
            <Col xs={12} md={6} className="home-header d-flex flex-column justify-content-center text-center text-md-left py-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pb-5"
              >
                <h1 className="heading mb-3 title-font">
                  {t('hello')}{" "}<span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
                </h1>
                <h2 className="heading-name styled-title">
                  {t('iam')}<span className="gradient-name"> {t('nametheo')}</span>
                </h2>

              </motion.div>

              {/* Développeur... */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="pt-3 pb-5 blue-title d-flex justify-content-center align-items-center"
              >
                <TypeDev />
              </motion.div>
            </Col>
            {/* Colonne pour l'image */}
            <Col xs={12} md={6} className="d-flex justify-content-center align-items-center py-4">
              <div className="logo-wrapper">
                <Tilt>
                  <motion.img
                    src={LogoDeveloper}
                    className="img-fluid"
                    alt={t('theo_developer')}
                    width="400"
                    height="400"
                    loading="eager"
                    decoding="sync"
                    initial={{ opacity: 0, x: 50 }}
                    animate={imgInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </Tilt>
              </div>
            </Col>

          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
