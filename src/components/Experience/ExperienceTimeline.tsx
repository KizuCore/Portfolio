import { Container } from "react-bootstrap";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import TardisEncounter from "../Easter/TardisEncounter";
import { useTimelineData } from "./data/timeline";
import TimelineItem from "./TimelineItem";
import '../../assets/styles/Experience/Experience.css';
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useElementScrollProgress from "@/hooks/useElementScrollProgress";

const ExperienceTimeline = () => {
  const { t } = useTranslation();
  const timelineData = useTimelineData();
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollPercentage = useElementScrollProgress(timelineRef);
  const reducedMotion = useReducedMotion();
  const [encounter, setEncounter] = useState(false);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!encounter) return;
    const interval = window.setInterval(() => setBeat(value => value + 1), 350);
    const end = window.setTimeout(() => { setEncounter(false); setBeat(0); }, 9450);
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setEncounter(false); setBeat(0); }
    };
    window.addEventListener("keydown", dismiss);
    return () => { window.clearInterval(interval); window.clearTimeout(end); window.removeEventListener("keydown", dismiss); };
  }, [encounter]);

  return (
    <Container fluid className="timeline-page">
      {encounter && <TardisEncounter beat={beat} reducedMotion={!!reducedMotion} />}
      <Container className="timeline-container">
        <motion.h1
          className="experience-title"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("about_experience")}
        </motion.h1>
        <p className="experience-intro">{t("career.intro")}</p>

        <section className="career-section career-work" aria-labelledby="career-work-title">
          <header className="career-section-heading"><span aria-hidden="true">01</span><div><h2 id="career-work-title">{t("career.work")}</h2><p>{t("career.work_intro")}</p></div></header>
          <div className="timeline">
            {timelineData.filter(item => item.type === "T").map((item, index) => (
              <TimelineItem key={item.title} item={item} onTimeAnomaly={() => setEncounter(true)} anomalyYear={encounter && !reducedMotion ? [3000, 1963, 2048, 1888, 2005, 1200, 2026][(beat + index) % 7] : undefined} />
            ))}
          </div>
        </section>

        <section className="career-section career-education" aria-labelledby="career-education-title">
          <header className="career-section-heading"><span aria-hidden="true">02</span><div><h2 id="career-education-title">{t("career.education")}</h2><p>{t("career.education_intro")}</p></div></header>
        <div className="timeline" ref={timelineRef}>
          <div className="timeline-line-track" aria-hidden="true" />
          <div
            className="timeline-line-progress"
            aria-hidden="true"
            style={{ "--timeline-progress": `${scrollPercentage / 100}` } as CSSProperties}
          />
          {timelineData.filter(item => item.type === "C").map((item, index) => (
            <TimelineItem key={index} item={item} onTimeAnomaly={() => setEncounter(true)} anomalyYear={encounter && !reducedMotion ? [3000, 1963, 2048, 1888, 2005, 1200, 2026][(beat + index) % 7] : undefined} />
          ))}

        </div>
        </section>
      </Container>
    </Container>
  );
};

export default ExperienceTimeline;
