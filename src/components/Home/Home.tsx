import { JSX, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import { easeOut, motion, spring, useAnimation } from 'framer-motion';

import Tilt from "react-parallax-tilt";
import TypeDev from "./Type.tsx";
import '../../assets/styles/Home/Home.css';
import { useInView } from 'react-intersection-observer';
import HomeButtons from "./HomeButtons.tsx";
import HomeStats from "./CountUp.tsx";
import Services from "./Services.tsx";
import Particle from "../../utils/Particle.tsx";

const LOGO_DEVELOPER_SRC = "/images/logodev.svg";

function Home(): JSX.Element {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isDragging, setIsDragging] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(() =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const controls = useAnimation();
  const enableTilt = !isMobile && isFinePointer && !prefersReducedMotion;

  const { ref, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  useEffect(() => {
    const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // <768px = mobile
      setIsFinePointer(pointerMedia.matches);
      setPrefersReducedMotion(motionMedia.matches);
    };

    handleResize(); // Execute au chargement
    window.addEventListener("resize", handleResize); // MAJ si resize
    pointerMedia.addEventListener("change", handleResize);
    motionMedia.addEventListener("change", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      pointerMedia.removeEventListener("change", handleResize);
      motionMedia.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    if (imgInView) {
      controls.start({ opacity: 1, scale: 1 });
    }
  }, [imgInView, controls]);

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
                    <span className="wave" role="img" aria-label="waving hand">{"\u{1F44B}\u{1F3FB}"}</span>
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
                    <span className="wave" role="img" aria-label="waving hand">{"\u{1F44B}\u{1F3FB}"}</span>
                  </h1>
                  <h2 className="heading-name styled-title">
                    {t('iam')}<span className="gradient-name"> {t('nametheo')}</span>
                  </h2>
                </motion.div>
              )}


              {/* DÃ©veloppeur... */}
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
              <div className={`logo-wrapper mt-3 mt-md-0 ${isDragging ? 'dragging' : ''}`}>
                <motion.div
                  className="black-hole"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                >
                  <div className="accretion-disk" />
                  <div className="event-horizon" />
                </motion.div>


                {/* Logo SVG */}
                {enableTilt ? (
                  <Tilt
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    transitionSpeed={360}
                    scale={1.01}
                    perspective={950}
                    glareEnable={false}
                  >
                    {isMobile ? (
                      <img
                        src={LOGO_DEVELOPER_SRC}
                        className="img-fluid"
                        alt={t('theo_developer')}
                        width="300"
                        height="300"
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                      />
                    ) : (
                      <motion.img
                        src={LOGO_DEVELOPER_SRC}
                        className="img-fluid"
                        alt={t('theo_developer')}
                        width="400"
                        height="400"
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                        drag
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => {
                          setIsDragging(false);
                          controls.start({
                            x: 0,
                            y: 0,
                            transition: { type: spring, stiffness: 500, damping: 20 }
                          });
                        }}
                        animate={controls}
                        initial={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: easeOut }}
                        style={{ cursor: "grab" }}
                      />

                    )}
                  </Tilt>
                ) : (
                  <div>
                    {isMobile ? (
                      <img
                        src={LOGO_DEVELOPER_SRC}
                        className="img-fluid"
                        alt={t('theo_developer')}
                        width="300"
                        height="300"
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                      />
                    ) : (
                      <motion.img
                        src={LOGO_DEVELOPER_SRC}
                        className="img-fluid"
                        alt={t('theo_developer')}
                        width="400"
                        height="400"
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                        drag
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => {
                          setIsDragging(false);
                          controls.start({
                            x: 0,
                            y: 0,
                            transition: { type: spring, stiffness: 500, damping: 20 }
                          });
                        }}
                        animate={controls}
                        initial={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: easeOut }}
                        style={{ cursor: "grab" }}
                      />

                    )}
                  </div>
                )}
              </div>
            </Col>
            <HomeStats />
          </Row>
          <Services />
        </Container>
      </Container>
    </section>
  );
}

export default Home;

