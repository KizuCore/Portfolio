import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaClock } from "@react-icons/all-files/fa/FaClock";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaPaperPlane } from "@react-icons/all-files/fa/FaPaperPlane";
import { FaEuroSign } from "@react-icons/all-files/fa/FaEuroSign";
import ContactForm from "./ContactForm.tsx";
import IconLink from "../Common/IconLink";
import Particle from "../../utils/Particle.tsx";
import { SITE_PROFILE, SOCIAL_LINKS } from "../../config/site";
import "../../assets/styles/Contact/Contact.css";
import "../../assets/styles/Home/Home.css";

function Contact(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Container fluid className="about-section pt-5 contact-page" id="home">
      <Particle />

      <Container className="home-content pt-md-0 pt-5 mt-3 mt-md-0 contact-layout">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="custom-title mb-3">{t("social")}</h1>
          <p className="contact-lead mb-0">{t("contact_intro")}</p>
        </motion.div>

        <Row className="justify-content-center g-4 p-0">
          <Col lg={7} className="contact-column order-2 order-lg-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <ContactForm />
            </motion.div>
          </Col>

          <Col lg={5} className="contact-column order-1 order-lg-2 pb-5 pb-lg-0">
            <motion.aside
              className="contact-info-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="contact-panel-heading">
                <span className="contact-panel-icon" aria-hidden="true">
                  <FaPaperPlane />
                </span>
                <p className="contact-panel-title mb-0">{t("contact_panel_title")}</p>
              </div>

              <p className="contact-panel-description">{t("contact_panel_description")}</p>

              <ul className="contact-points">
                <li>{t("contact_point_1")}</li>
                <li>{t("contact_point_2")}</li>
                <li>{t("contact_point_3")}</li>
              </ul>

              <div className="contact-meta-grid">
                <div className="contact-meta-item">
                  <FaClock className="contact-meta-icon" aria-hidden="true" />
                  <div>
                    <span>{t("contact_meta_availability_label")}</span>
                    <strong>{t("contact_meta_availability_value")}</strong>
                  </div>
                </div>

                <div className="contact-meta-item">
                  <FaPaperPlane className="contact-meta-icon" aria-hidden="true" />
                  <div>
                    <span>{t("contact_meta_response_label")}</span>
                    <strong>{t("contact_meta_response_value")}</strong>
                  </div>
                </div>

                <div className="contact-meta-item">
                  <FaMapMarkerAlt className="contact-meta-icon" aria-hidden="true" />
                  <div>
                    <span>{t("contact_meta_location_label")}</span>
                    <strong>{t("contact_meta_location_value")}</strong>
                  </div>
                </div>

                <div className="contact-meta-item contact-meta-rate">
                  <FaEuroSign className="contact-meta-icon" aria-hidden="true" />
                  <div>
                    <span>{t("contact_meta_rate_label")}</span>
                    <strong>{t("contact_meta_rate_value")}</strong>
                  </div>
                </div>
              </div>

              <div className="contact-actions">
                <IconLink
                  href={`mailto:${SITE_PROFILE.email}`}
                  icon={FaEnvelope}
                  className="contact-quick-link"
                  external={false}
                >
                  {t("contact_cta_email")}
                </IconLink>

                <IconLink href={SOCIAL_LINKS.linkedin} icon={FaLinkedin} className="contact-quick-link">
                  {t("contact_cta_linkedin")}
                </IconLink>

                <IconLink href={SOCIAL_LINKS.github} icon={FaGithub} className="contact-quick-link">
                  GitHub
                </IconLink>
              </div>
            </motion.aside>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;
