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
} from "react-icons/si";

const icons = [
  { component: SiFlutter, name: "Flutter" },
  { component: DiMysql, name: "MySQL" },
  { component: SiTailwindcss, name: "Tailwind CSS" },
  { component: SiBootstrap, name: "Bootstrap" },
  { component: SiExpress, name: "Express" },
  { component: DiPhp, name: "PHP" },
  { component: DiScala, name: "Scala" },
  { component: DiDjango, name: "Django" },
  { component: DiJavascript1, name: "JavaScript" },
  { component: DiNodejs, name: "Node.js" },
  { component: DiReact, name: "React" },
  { component: DiPython, name: "Python" },
  { component: FaJava, name: "Java" },
  { component: FaVuejs, name: "Vue.js" },
  { component: DiWordpress, name: "Wordpress" },
  { component: SiCss3, name: "CSS" },
  { component: SiLaravel, name: "Laravel (En cours)" },
];

function Techstack() {
  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {icons.map((icon, index) => (
          <Col
            key={index}
            xs={4}
            md={2}
            className="tech-icons"
            data-tip={icon.name}
          >
            <icon.component />
          </Col>
        ))}
      </Row>
      <ReactTooltip />
    </div>
  );
}

export default Techstack;
