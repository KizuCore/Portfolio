import { motion } from "framer-motion";
import { TimelineItem as TimelineItemType } from "./data/timelineData";
import { FaBriefcase } from "@react-icons/all-files/fa/FaBriefcase";
import { FaUserGraduate } from "@react-icons/all-files/fa/FaUserGraduate";
import { useTranslation } from "react-i18next";

const getIcon = (type: string) =>
  type === "C" ? (
    <FaUserGraduate style={{ transform: "translateY(-1px)" }} />
  ) : (
    <FaBriefcase style={{ transform: "translateY(-1px)" }} />
  );

type Props = {
  item: TimelineItemType;
  isLeft: boolean;
};

const TimelineItem = ({ item, isLeft }: Props) => {
  const { t } = useTranslation();
  const xOffset = isLeft ? -26 : 26;
  const hasHighlights = Boolean(item.highlights?.length);
  const showRncpLine = (item.diplome || "").toLowerCase().includes("rncp");

  return (
    <div className={`timeline-event ${isLeft ? "left" : "right"}`}>
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.24, delay: 0.05 }}
        className="timeline-event-dot"
      />

      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`timeline-event-branch ${isLeft ? "left" : "right"}`}
      />

      <motion.article
        initial={{ opacity: 0, x: xOffset, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
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

        <p className="timeline-card-date">{item.date}</p>

        {item.subtitle && <p className="timeline-card-subtitle">{item.subtitle}</p>}
        {showRncpLine && <p className="timeline-card-rncp">{item.diplome}</p>}
        {item.diplome && (
          <p className="timeline-card-diploma">
            <span className="timeline-card-diploma-label">{t("experience_diploma_label")}</span>
          </p>
        )}
        {item.description && <p className="timeline-card-description">{item.description}</p>}

        {hasHighlights && (
          <ul className="timeline-card-list" aria-label="Missions principales">
            {item.highlights?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}

        {item.stack && (
          hasHighlights ? (
            <p className="timeline-stack-inline mt-2">{item.stack}</p>
          ) : (
            <div className="timeline-stack-tags mt-2" aria-label="Technologies">
              {item.stack.split(",").map((tech, i) => (
                <span key={i} className="timeline-stack-badge">
                  {tech.trim()}
                </span>
              ))}
            </div>
          )
        )}
      </motion.article>
    </div>
  );
};

export default TimelineItem;
