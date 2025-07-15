import { JSX, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import { motion } from 'framer-motion';

import LogoDeveloper from "../../assets/images/logodev.svg"
import Tilt from "react-parallax-tilt";
import Particle from "../Utils/Particle.js";
import TypeDev from "./Type.tsx";
import '../../assets/styles/Home/Home.css';
import { useInView } from 'react-intersection-observer';
import HomeButtons from "./HomeButtons.tsx";
import HomeStats from "./CountUp.tsx";

function Home(): JSX.Element {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const { ref, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // <768px = mobile
    };

    handleResize(); // Execute au chargement
    window.addEventListener("resize", handleResize); // MAJ si resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      <Container fluid className="about-section pt-0" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center justify-content-center text-center text-md-left padtopbot">
            {/* Texte */}
            <Col xs={12} md={6} className="home-header d-flex flex-column justify-content-center text-center text-md-left py-md-5">
              {isMobile ? (
                <div className="pb-md-5 pb-0">
                  <h1 className="heading mb-3 title-font">
                    {t('hello')}{" "}
                    <span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
                  </h1>
                  <h2 className="heading-name styled-title">
                    {t('iam')}<span className="pr-2 gradient-name">{t('nametheo')}</span>
                  </h2>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="pb-5"
                >
                  <h1 className="heading mb-3 title-font">
                    {t('hello')}{" "}
                    <span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
                  </h1>
                  <h2 className="heading-name styled-title">
                    {t('iam')}<span className="gradient-name"> {t('nametheo')}</span>
                  </h2>
                </motion.div>
              )}


              {/* Développeur... */}
              {isMobile ? (
                <div className="pt-3 pb-5 d-flex justify-content-center align-items-center">
                  <TypeDev />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="pt-3 pb-5 d-flex justify-content-center align-items-center"
                >
                  <TypeDev />
                </motion.div>
              )}
              <HomeButtons />
            </Col>
            {/* Colonne pour l'image */}
            <Col ref={ref} xs={12} md={6} className="d-flex justify-content-center align-items-center py-4">
              <div className="logo-wrapper mt-3 mt-md-0">
                <Tilt>
                  {isMobile ? (
                    <img
                      src={LogoDeveloper}
                      className="img-fluid"
                      alt={t('theo_developer')}
                      width="400"
                      height="400"
                      loading="eager"
                      decoding="sync"
                    />
                  ) : (
                    <motion.img
                      src={LogoDeveloper}
                      className="img-fluid"
                      alt={t('theo_developer')}
                      width="400"
                      height="400"
                      loading="eager"
                      decoding="sync"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={imgInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                  )}
                </Tilt>
              </div>
            </Col>
            <HomeStats />
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
