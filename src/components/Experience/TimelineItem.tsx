import { motion, useReducedMotion } from "framer-motion";
import { TimelineItem as TimelineItemType } from "./data/timeline";
import { FaBriefcase } from "@react-icons/all-files/fa/FaBriefcase";
import { FaUserGraduate } from "@react-icons/all-files/fa/FaUserGraduate";
import { useTranslation } from "react-i18next";

const getIcon = (type: string) =>
  type === "C" ? (
    <FaUserGraduate className="timeline-icon-offset-sm" />
  ) : (
    <FaBriefcase className="timeline-icon-offset-sm" />
  );

type Props = {
  item: TimelineItemType;
};

const TimelineItem = ({ item }: Props) => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const hasHighlights = Boolean(item.highlights?.length);
  const showRncpLine = (item.diplome || "").toLowerCase().includes("rncp");

  return (
    <div className="timeline-event">
      <p className="timeline-card-date">{item.date}</p>
      <span className="timeline-event-dot" aria-hidden="true" />
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        className={`timeline-card ${hasHighlights ? "timeline-card-detailed" : ""}`}
        role="region"
        aria-label={`${item.title} - ${item.date}`}
      >
        <header className="timeline-card-header">
          <span className="timeline-card-icon blue" aria-hidden="true">
            {getIcon(item.type)}
          </span>
          <h2 className="timeline-card-title">{item.title}</h2>
        </header>


        {item.subtitle && <p className="timeline-card-subtitle">{item.subtitle}</p>}
        {showRncpLine && <p className="timeline-card-rncp">{item.diplome}</p>}
        {item.description && <p className="timeline-card-description">{item.description}</p>}
        {item.diplome && (
          <p className="timeline-card-diploma">
            <span className="timeline-card-diploma-label">{t("experience_diploma_label")}</span>
          </p>
        )}

        {hasHighlights && (
          <ul className="timeline-card-list" aria-label={t("experience_main_missions_aria")}>
            {item.highlights?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}

        {item.stack && (
          <div className="timeline-stack-tags" aria-label={t("technologies")}>
            {item.stack.split(",").map((tech) => (
              <span key={tech.trim()} className="timeline-stack-badge">{tech.trim()}</span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
};

export default TimelineItem;
