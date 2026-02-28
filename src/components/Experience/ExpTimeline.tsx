import { Container } from "react-bootstrap";
import { useRef, type CSSProperties } from "react";
import { useTimelineData } from "./data/timelineData";
import TimelineItem from "./TimelineItem.tsx";
import '../../assets/styles/Experience/Experience.css';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useScrollProgress from "../../utils/useScrollProgress.ts";
import Particle from "../../utils/Particle.tsx";

const Experience = () => {
  const { t } = useTranslation();
  const timelineData = useTimelineData();
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollPercentage = useScrollProgress(timelineRef);

  return (
    <Container fluid className="timeline-page">
      <Particle />
      <Container className="timeline-container">
        <motion.h1
          className="custom-title pb-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("about_experience")}
        </motion.h1>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-head-dot" />
          <div className="timeline-line-track" />
          <div
            className="timeline-line-progress"
            style={{ "--timeline-progress": `${scrollPercentage / 100}` } as CSSProperties}
          />
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} isLeft={index % 2 === 0} />
          ))}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="timeline-tail-dot"
          />
        </div>
      </Container>
    </Container>
  );
};

export default Experience;
