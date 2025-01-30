import React from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import { motion } from 'framer-motion';
import myImg from "@image/home/avatar.webp";
import Tilt from "react-parallax-tilt";
import { useInView } from 'react-intersection-observer';
import Contact from "./Contact";
import '@style/Home/Home.css'; 

function Home2() {
  const { t } = useTranslation();

  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: paragraphRef, inView: paragraphInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: refImg, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        {/* Introduction */}
        <Row className="justify-content-center text-center">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: -20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity: titleInView ? 1 : 0 }}
          >
            <h2 style={{ fontSize: "2.6em" }}>
              <span className="blue-title" style={{ fontFamily: 'Montserrat, serif'  }}>
                {t('introduction')}
              </span>
            </h2>
          </motion.div>
        </Row>
        {/* Ligne pour texte et image */}
        <Row className="d-flex align-items-center justify-content-center p-0 m-0">
          <Col md={6} className="d-flex justify-content-center align-items-center home-about-description">
            <motion.div
              ref={paragraphRef}
              initial={{ opacity: 0, x: -50 }}
              animate={paragraphInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="home-about-body mt-4 text-justify background-box"
              style={{ opacity: paragraphInView ? 1 : 0 }}
            >
              {t('description')}
              <br />
              <br />{t('classic_technologies')}
              <b className="blue"> {t('technologies')} </b>
              <br />
              <br />
              {t('interests')}
              <b className="blue"> {t('projects_and_discovery')}</b>
              <br />
              <br />
              {t('passion')} <b className="blue">{t('nodejs')}</b> {t('and')} <b className="blue">{t('reactjs')}</b>.
            </motion.div>
          </Col>

          {/* Image */}
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Tilt>
              <motion.img
                src={myImg}
                className="img-fluid"
                ref={refImg}
                alt={t('theo_developer')}
                width="300"
                height="300"
                decoding="async"
                initial={{ opacity: 0, x: 50 }}
                animate={imgInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ opacity: imgInView ? 1 : 0 }}
              />
            </Tilt>
          </Col>
        </Row>
        
        {/* Réseaux sociaux */}
        <Row className="py-5">
          <Contact />
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
