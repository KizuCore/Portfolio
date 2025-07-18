import { motion } from "framer-motion";
import { TimelineItem as TimelineItemType } from "./data/timelineData";
import { FaBriefcase, FaUserGraduate } from "react-icons/fa";

const getIcon = (type: string) =>
    type === "C" ? (
        <FaUserGraduate style={{ transform: "translateY(-2px)" }} />
    ) : (
        <FaBriefcase style={{ transform: "translateY(-2px)" }} />
    );

type Props = {
    item: TimelineItemType;
    isLeft: boolean;
};

const TimelineItem = ({ item, isLeft }: Props) => {
    return (
        <div style={{ position: "relative" }}>

            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`timeline-connector ${isLeft ? "left" : "right"}`}
            />

            {/* Animated branch */}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "30px" }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={`timeline-branch ${isLeft ? "left" : "right"}`}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`bubble ${isLeft ? "right" : "left"}`}
                role="region"
                aria-label={`Événement : ${item.title}`}
            >
                <h5 className="fw-bold text-light d-flex gap-2 align-items-start">
                    <span className="align-self-start blue">{getIcon(item.type)}</span>
                    <span>{item.title}</span>
                </h5>
                <p className="blue small mb-1">{item.date}</p>
                {item.subtitle && <h6 className="text-light">{item.subtitle}</h6>}
                {item.diplome && <h6 className="text-light">{item.diplome}</h6>}
                {item.description && (
                    <p className="text-light">
                        <i>{item.description}</i>
                    </p>
                )}
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
        </div>
    );
};

export default TimelineItem;
