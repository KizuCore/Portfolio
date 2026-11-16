import { useRef, type CSSProperties } from "react";
import { useTimelineData } from "../hooks/useTimelineData";
import TimelineItem from "../components/TimelineItem";
import '../styles/Experience.css';
import { useTranslation } from "react-i18next";
import useElementScrollProgress from "@/shared/hooks/useElementScrollProgress";

const ExperienceTimeline = () => {
  const { t } = useTranslation();
  const timelineData = useTimelineData();
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollPercentage = useElementScrollProgress(timelineRef);

  return (
    <div className="timeline-page site-page">
      <div className="timeline-container page-content site-container">
        <p className="page-eyebrow">{t("page_headers.experience")}</p>
        <h1 className="experience-title page-title">
          {t("about_experience")}
        </h1>
        <p className="experience-intro">{t("career.intro")}</p>

        <section className="career-section career-work" aria-labelledby="career-work-title">
          <header className="career-section-heading"><span aria-hidden="true">01</span><div><h2 id="career-work-title">{t("career.work")}</h2><p>{t("career.work_intro")}</p></div></header>
          <div className="timeline">
            {timelineData.filter(item => item.type === "T").map((item) => (
              <TimelineItem key={item.title} item={item} />
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
          {timelineData.filter(item => item.type === "C").map((item) => (
            <TimelineItem key={item.title} item={item} />
          ))}

        </div>
        </section>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
