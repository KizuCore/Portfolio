import React, { JSX, Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/Contact/Contact.css';
import ContactForm from "./ContactForm.tsx";
import Particle from "../Utils/Particle.js";
import { motion, easeOut } from 'framer-motion';
import '../../assets/styles/Home/Home.css';
import HomeButtons from "../Home/HomeButtons.tsx";

function Contact(): JSX.Element {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <Container fluid className="about-section pt-5" id="home">
      <Particle />
      <Container className="home-content pt-md-0 pt-5 mt-3 mt-md-0">
        <Row className="justify-content-center p-0">
          <motion.h1
            className="custom-title pb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {t('social')}
          </motion.h1>
          <Col md={7} className="home-about-social pt-3" ref={ref}>
            <ContactForm />
          </Col>
          <Col md={5} className="home-about-social pt-3" ref={ref}>
            <div className="contact-info-box">
              <p style={{ fontSize: "2rem" }}>📬 {t("Informations")}</p>
              <p className="text-justify">
                {t("Vous avez un projet ?")}
              </p>
              <p className="text-justify">
                {t("Qu’il s’agisse d’un site vitrine, d’une application, d’une mission freelance ou d’une opportunité professionnelle, ...")}
              </p>
              <p className="text-justify pb-3">
                {t("N’hésitez pas à me contacter !")}
              </p>
              <hr className="pt-3" style={{ opacity: 0.8 }} />
              <p className="pb-3">🕒 <strong>{t("Disponible pour de nouveaux projets")}</strong></p>
              <HomeButtons />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;
