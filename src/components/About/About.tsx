import { JSX, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import { easeOut, motion } from 'framer-motion';
import Particle from "../Utils/Particle.js";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import Toolstack from "./Toolstack.tsx";
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/About/About.css';
import SolarSystem from "./SolarSystem.tsx";



function About(): JSX.Element {
  const { t } = useTranslation();
  const { ref: refImg, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });



  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row className="d-flex align-items-center justify-content-center pt-4 pb-0">

          <motion.h1
            className="custom-title pt-2 pb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            {t('about_me')}
          </motion.h1>

          <Col md={7} xs={12} className="text-center text-md-left p">
            <Aboutcard />
          </Col>

          <Col md={1} xs={0}>
          </Col>
          <Col md={4} xs={12} className="d-flex justify-content-center align-items-center about-img" ref={refImg}>

            <motion.div
              className="canvas-container"
              initial={{ opacity: 0 }}
              animate={imgInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <SolarSystem />
            </motion.div>

          </Col>
        </Row>

        <motion.h2
          className="custom-title custom-title-1 py-5 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t('professional_skills')} {t('skills')}
        </motion.h2>
        <Techstack />
        <Toolstack />
        <Github />
      </Container>
    </Container>
  );
}

export default About;
