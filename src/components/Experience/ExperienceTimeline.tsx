import { Container } from "react-bootstrap";
import { useRef, type CSSProperties } from "react";
import { useTimelineData } from "./data/timeline";
import TimelineItem from "./TimelineItem";
import '../../assets/styles/Experience/Experience.css';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useElementScrollProgress from "@/hooks/useElementScrollProgress";

const ExperienceTimeline = () => {
  const { t } = useTranslation();
  const timelineData = useTimelineData();
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollPercentage = useElementScrollProgress(timelineRef);

  return (
    <Container fluid className="timeline-page">
      <Container className="timeline-container">
        <motion.h1
          className="experience-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("about_experience")}
        </motion.h1>

        <div className="timeline" ref={timelineRef}>

          <div className="timeline-line-track" aria-hidden="true" />
          <div
            className="timeline-line-progress"
            aria-hidden="true"
            style={{ "--timeline-progress": `${scrollPercentage / 100}` } as CSSProperties}
          />
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}

        </div>
      </Container>
    </Container>
  );
};

export default ExperienceTimeline;
