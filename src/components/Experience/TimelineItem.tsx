import { motion } from "framer-motion";
import { TimelineItem as TimelineItemType } from "./data/timelineData";
import { FaBriefcase, FaUserGraduate } from "react-icons/fa";

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
  const xOffset = isLeft ? -26 : 26;

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
        className="timeline-card"
        role="region"
        aria-label={`${item.title} - ${item.date}`}
      >
        <header className="timeline-card-header">
          <span className="timeline-card-icon blue" aria-hidden="true">
            {getIcon(item.type)}
          </span>
          <h3 className="timeline-card-title">{item.title}</h3>
        </header>

        <p className="timeline-card-date">{item.date}</p>

        {item.subtitle && <p className="timeline-card-subtitle">{item.subtitle}</p>}
        {item.diplome && <p className="timeline-card-diploma">{item.diplome}</p>}
        {item.description && <p className="timeline-card-description">{item.description}</p>}

        {item.stack && (
          <div className="timeline-stack-tags mt-2" aria-label="Technologies">
            {item.stack.split(",").map((tech, i) => (
              <span key={i} className="timeline-stack-badge">
                {tech.trim()}
              </span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
};

export default TimelineItem;
