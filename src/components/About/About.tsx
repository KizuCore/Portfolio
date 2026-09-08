import { JSX } from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import { easeOut, motion } from 'framer-motion';
import GitHubActivity from "./GitHubActivity";
import TechStack from "./TechnologyStack";
import AboutCard from "./AboutCard";
import ToolStack from "./DevelopmentTools";
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/About/About.css';
import SolarSystem from "./SolarSystem.tsx";
import "../../assets/styles/About/AboutIntro.css";



function About(): JSX.Element {
  const { t } = useTranslation();
  const { ref: refImg, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });



  return (
    <Container fluid className="about-section">
      <Container>
        <Row className="about-intro align-items-center">

          <motion.h1
            className="about-intro-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            {t('about_me')}
          </motion.h1>

          <Col lg={7} xs={12} className="about-intro-copy">
            <AboutCard />
          </Col>

          <Col lg={5} xs={12} className="d-flex justify-content-center align-items-center about-img" ref={refImg}>

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
        <TechStack />
        <ToolStack />
        <GitHubActivity />
      </Container>
    </Container>
  );
}

export default About;
