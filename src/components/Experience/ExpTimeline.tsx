import { Container } from "react-bootstrap";
import { useEffect, useRef } from "react";
import useScrollProgress from "../Utils/useScrollProgress";
import { useTimelineData } from "./data/timelineData";
import TimelineItem from "./TimelineItem.tsx";
import '../../assets/styles/Experience/Experience.css';
import Particle from "../Utils/Particle.tsx";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Experience = () => {
  const { t } = useTranslation();
  const timelineData = useTimelineData();
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollPercentage = useScrollProgress(timelineRef);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container>
      <Particle />
      <Container fluid className="timeline-container">
        <motion.h1
          className="custom-title pb-5 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("Mon parcours")}
        </motion.h1>
        <div className="timeline" ref={timelineRef}>
          <div className="timeline-arrow-up-wrapper">
            <svg className="timeline-chevron" viewBox="0 0 24 24">
              <polyline points="6 15 12 9 18 15" />
            </svg>
          </div>



          <div className="timeline-line" style={{ height: `${scrollPercentage}%` }} />
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} isLeft={index % 2 === 0} />
          ))}
          <div className="timeline-start-circle" />
        </div>
      </Container>
    </Container>
  );
};

export default Experience;