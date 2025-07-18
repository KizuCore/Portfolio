import { Container } from "react-bootstrap";
import { useEffect, useRef } from "react";
import useScrollProgress from "../Utils/useScrollProgress";
import { useTimelineData } from "./data/timelineData";
import TimelineItem from "./TimelineItem.tsx";
import '../../assets/styles/Experience/Experience.css';
import Particle from "../Utils/Particle.tsx";

const Experience = () => {
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
        <div className="timeline" ref={timelineRef}>
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