import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import '../../assets/styles/Experience/Experience.css';
import Particle from "../Utils/Particle";
import { FaBriefcase, FaUserGraduate } from "react-icons/fa";

type TimelineItem = {
  type: string;
  title: string;
  subtitle?: string;
  diplome?: string;
  date: string;
  description?: string;
};


const Experience = () => {
  const { t } = useTranslation();
  const timelineData: TimelineItem[] = [ /* C = Cours - T = Travail */
    {
      type: "T",
      title: t("experience_1_title"),
      date: t("experience_1_date"),
      description: t("experience_1_description"),
    },
    {
      type: "C",
      title: t("experience_2_title"),
      subtitle: t("experience_2_subtitle"),
      date: t("experience_2_date"),
    },
    {
      type: "C",
      title: t("experience_3_title"),
      subtitle: t("experience_3_subtitle"),
      diplome: t("experience_3_diplome"),
      date: t("experience_3_date"),
    },
    {
      type: "C",
      title: t("experience_4_title"),
      subtitle: t("experience_4_subtitle"),
      date: t("experience_4_date"),
    },
    {
      type: "C",
      title: t("experience_5_title"),
      subtitle: t("experience_5_subtitle"),
      date: t("experience_5_date"),
    },
    {
      type: "C",
      title: t("experience_6_title"),
      date: t("experience_6_date"),
    },
  ];
  
  return (
    <Container className="py-5">
      <Particle />

      <h2 className="text-center text-light title-font mb-5 pt-5">Parcours</h2>
      <div className="timeline position-relative">

        {/* Flèche du haut */}
        <div className="timeline-arrow-up-wrapper">
          <div className="timeline-arrow-up" />
          <motion.div
            className="timeline-arrow-up-label text-warning text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <i className="fas fa-arrow-up me-1" />
          </motion.div>
        </div>
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <Row className="timeline-item" key={index}>
              {isLeft ? (
                <>
                  <Col md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bubble left"
                    >
                      <h5 className="fw-bold text-light d-flex gap-2 justify-content-end">
                        {item.type === "C" ? <FaUserGraduate className="text-warning" /> : <FaBriefcase className="text-warning" />}
                        {item.title}
                      </h5>
                      {item.subtitle && (
                        <h6 className="text-light">{item.subtitle}</h6>
                      )}
                      <p className="text-warning small mb-1">{item.date}</p>
                      {item.subtitle && (
                        <h6 className="text-light">{item.diplome}</h6>
                      )}
                      {item.description && (
                        <p className="text-light">{item.description}</p>
                      )}
                    </motion.div>
                  </Col>
                  <Col md={6} />
                </>
              ) : (
                <>
                  <Col md={6} />
                  <Col md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bubble right"
                    >
                      <h5 className="fw-bold text-light d-flex gap-2 justify-content-start align-items-center">
                        {item.type === "C" ? <FaUserGraduate className="text-warning" /> : <FaBriefcase className="text-warning" />}
                        {item.title}
                      </h5>
                      <p className="text-warning small mb-1">{item.date}</p>
                      {item.subtitle && (
                        <h6 className="text-light">{item.subtitle}</h6>
                      )}
                      {item.subtitle && (
                        <h6 className="text-light">{item.diplome}</h6>
                      )}
                      {item.description && (
                        <p className="text-light">{item.description}</p>
                      )}
                    </motion.div>
                  </Col>
                </>
              )}
            </Row>
          );
        })}
        <div className="timeline-line"></div>
        <div className="timeline-start-circle"></div>
      </div>
    </Container>
  );
};

export default Experience;
