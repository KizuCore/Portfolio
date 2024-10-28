import React from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import { motion } from 'framer-motion';
import Particle from "../Utils/Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/images/about/about.webp";
import Toolstack from "./Toolstack";
import LevelCircle from "./Utils/LevelCircle"; 
import { useInView } from 'react-intersection-observer';
import '../../Assets/style/About/About.css'; 

function About() {
  const { t } = useTranslation();
  
  const { ref: refImg, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row className="d-flex align-items-center justify-content-center py-4">
          <motion.h1
            className="pb-3 title-font"
            style={{ fontSize: "2.5em" }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {t('about_me')} <strong className="blue-title">{t('i_am')}</strong>
          </motion.h1>

          <Col md={8} className="text-center text-md-left">
            <Aboutcard />
          </Col>

          <Col md={4} className="d-flex justify-content-center align-items-center about-img" ref={refImg}>
            <motion.img 
              src={laptopImg} 
              alt={t('about_image_alt', { name: 'Théo Guérin' })} 
              className="img-fluid" 
              loading="lazy" 
              decoding="async"
              initial={{ opacity: 0, x: 50 }}
              animate={imgInView  ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ opacity: imgInView ? 1 : 0 }}
            />
          </Col>
        </Row>

        <motion.h2
          className="project-heading text-center mt-5 title-font mb-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <strong className="blue-title">{t('professional_skills')}</strong> {t('skills')}
        </motion.h2>
        
        {/* Section des niveaux */}
        <Row className="text-center mt-5 mb-4">
          <Col md={3}>
            <div className="d-flex justify-content-center align-items-center">
              <LevelCircle color="rgb(255, 145, 0, 0.8)" /> {/* Boule orange */}
              <span>{t('novice')}</span>
            </div>
          </Col>
          <Col md={3}>
            <div className="d-flex justify-content-center align-items-center">
              <LevelCircle color="rgba(255, 255, 0, 0.8)" /> {/* Boule jaune */}
              <span>{t('intermediate')}</span>
            </div>
          </Col>
          <Col md={3}>
            <div className="d-flex justify-content-center align-items-center">
              <LevelCircle color="rgba(0, 190, 0, 0.8)" /> {/* Boule verte */}
              <span>{t('advanced')}</span>
            </div>
          </Col>
          <Col md={3}>
            <div className="d-flex justify-content-center align-items-center">
              <LevelCircle color="rgba(39, 184, 241, 0.8)" /> {/* Boule bleu */}
              <span>{t('favorite2')}</span>
            </div>
          </Col>
        </Row>
        
        <Techstack />

        <motion.h2
          className="project-heading text-center mt-5 title-font mb-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <strong className="blue-title">{t('tools')}</strong> {t('i_use')}
        </motion.h2>

        <Toolstack />
        <Github />
      </Container>
    </Container>
  );
}

export default About;
