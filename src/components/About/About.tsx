import { JSX, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import { easeOut, motion } from 'framer-motion';
import Particle from "../Utils/Particle.js";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "@image/about/about.webp";
import Toolstack from "./Toolstack.tsx";
import LevelCircle from "../Utils/LevelCircle";
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/About/About.css';

function About(): JSX.Element {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const { ref: refImg, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row className="d-flex align-items-center justify-content-center py-4">

          <motion.h1
            className="custom-title pt-2 pb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            {t('about_me')} {t('i_am')}
          </motion.h1>

          <Col md={8} className="text-center text-md-left order-2 order-md-1">
            <Aboutcard />
          </Col>

          <Col md={4} className="d-flex justify-content-center align-items-center about-img order-1 order-md-2 pb-4 pb-md-0" ref={refImg}>
            {isMobile ? (
              <img
                src={laptopImg}
                alt={t('about_image_alt', { name: 'Théo Guérin' })}
                className="img-fluid"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <motion.img
                src={laptopImg}
                alt={t('about_image_alt', { name: 'Théo Guérin' })}
                className="img-fluid"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, x: 50 }}
                animate={imgInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            )}
          </Col>
        </Row>



        <motion.h2
          className="custom-title custom-title-1 py-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t('professional_skills')}{" "}{t('skills')}
        </motion.h2>

        {/* Section des niveaux */}
        <Row className="text-center mt-5 mb-4 pb-4">
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
        <Toolstack />
        <Github />
      </Container>
    </Container>
  );
}

export default About;
