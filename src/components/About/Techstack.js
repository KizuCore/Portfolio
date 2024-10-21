import React from "react";
import { Col, Row } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMysql,
  DiPython,
  DiDjango,
  DiScala,
  DiPhp,
  DiWordpress,
} from "react-icons/di";
import { FaJava, FaVuejs } from "react-icons/fa";
import {
  SiFlutter,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiCss3,
  SiLaravel,
  SiFlask
} from "react-icons/si";

// Définition des technologies avec leur niveau (0=Novice, 1=Intermédiaire, 2=Expérimenté)
const icons = [
  { component: SiFlutter, name: "Flutter", level: 2 },
  { component: DiMysql, name: "MySQL", level: 2 },
  { component: SiTailwindcss, name: "Tailwind CSS", level: 1 },
  { component: SiBootstrap, name: "Bootstrap", level: 2 },
  { component: SiExpress, name: "Express", level: 2 },
  { component: DiPhp, name: "PHP", level: 2 },
  { component: DiScala, name: "Scala", level: 1 },
  { component: DiDjango, name: "Django", level: 1 },
  { component: DiJavascript1, name: "JavaScript", level: 1 },
  { component: DiNodejs, name: "Node.js", level: 2 },
  { component: DiReact, name: "React", level: 2 },
  { component: DiPython, name: "Python", level: 2 },
  { component: FaJava, name: "Java", level: 2 },
  { component: FaVuejs, name: "Vue.js", level: 0 },
  { component: DiWordpress, name: "Wordpress", level: 1 },
  { component: SiCss3, name: "CSS", level: 2 },
  { component: SiFlask, name: "Flask", level: 0 },
  { component: SiLaravel, name: "Laravel", level: 0 }
];

function Techstack() {
  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {icons.map((icon, index) => {
          const IconComponent = icon.component;

          // Déterminer classe CSS avec niveau
          const levelClass =
            icon.level === 0 ? "border-blue" : icon.level === 1 ? "border-yellow" : "border-green";

          return (
            <Col
              key={index}
              xs={4}
              md={2}
              className={`tech-icons ${levelClass}`} 
              data-tip={icon.name}
            >
              <IconComponent />
            </Col>
          );
        })}
      </Row>
      <ReactTooltip />
    </div>
  );
}

export default Techstack;
