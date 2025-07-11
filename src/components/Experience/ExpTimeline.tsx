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
  stack?: string;
};
const getIcon = (type: string) => {
  return type === "C" ? <FaUserGraduate style={{ transform: "translateY(-2px)" }} /> : <FaBriefcase style={{ transform: "translateY(-2px)" }} />;
};



const Experience = () => {
  const { t } = useTranslation();
  const timelineData: TimelineItem[] = [ /* C = Cours - T = Travail */
    {
      type: "T",
      title: t("experience_1_title"),
      date: t("experience_1_date"),
      subtitle: t("experience_1_subtitle"),
      description: t("experience_1_description"),
      stack: t("experience_1_stack"),
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
      subtitle: t("experience_6_subtitle"),
      date: t("experience_6_date"),
    },
  ];

  return (
    <Container fluid className="about-section pt-5 mt-5" id="home">
      <Particle />
      <Container className="home-content pt-5 mt-5">
        <motion.h1
          className="custom-title pb-5 pt-3 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("Mon parcours")}
        </motion.h1>

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
                        <h5 className="fw-bold text-light gap-2 phone-content-end">
                          <span className="align-self-start text-warning">
                            {getIcon(item.type)}
                          </span>
                          <span>{item.title}</span>
                        </h5>
                        <p className="text-warning small mb-1">{item.date}</p>
                        {item.subtitle && <h6 className="text-light">{item.subtitle}</h6>}
                        {item.diplome && <h6 className="text-light">{item.diplome}</h6>}
                        {item.description && <p className="text-light"><i>{item.description}</i></p>}
                        {item.stack && (
                          <div className="stack-tags mt-2">
                            {item.stack.split(",").map((tech, i) => (
                              <span key={i} className="stack-badge">
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
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
                        <h5 className="fw-bold text-light d-flex gap-2 align-items-start">
                          <span className="align-self-start text-warning">
                            {getIcon(item.type)}
                          </span>
                          <span>{item.title}</span>
                        </h5>

                        <p className="text-warning small mb-1">{item.date}</p>
                        {item.subtitle && <h6 className="text-light">{item.subtitle}</h6>}
                        {item.diplome && <h6 className="text-light">{item.diplome}</h6>}
                        {item.description && <p className="text-light"><i>{item.description}</i></p>}
                        {item.stack && <p className="text-light"><b>Stack :</b> {item.stack}</p>}
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
    </Container>
  );
};

export default Experience;
