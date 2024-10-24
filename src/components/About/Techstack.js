import React from "react";
import { Col, Row } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { useTranslation } from 'react-i18next';
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
import { FaFileExcel, FaJava, FaVuejs } from "react-icons/fa";
import {
  SiFlutter,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiCss3,
  SiLaravel,
  SiNestjs,
  SiFlask,
  SiCplusplus,
  SiGnubash,
  SiKotlin
} from "react-icons/si";

// Technologies avec niveau (0=Novice, 1=Intermédiaire, 2=Expérimenté, 3=Favori)
const icons = [
  { component: SiFlutter, name: "Flutter", level: 3 },
  { component: DiReact, name: "React", level: 3 },
  { component: SiExpress, name: "Express", level: 3 },
  { component: DiMysql, name: "MySQL", level: 2 },
  { component: SiBootstrap, name: "Bootstrap", level: 2 },
  { component: DiPhp, name: "PHP", level: 2 },
  { component: DiScala, name: "Scala", level: 2 },
  { component: DiJavascript1, name: "JavaScript", level: 2 },
  { component: DiNodejs, name: "Node.js", level: 2 },
  { component: DiPython, name: "Python", level: 2 },
  { component: FaJava, name: "Java", level: 2 },
  { component: DiWordpress, name: "Wordpress", level: 2 },
  { component: SiCss3, name: "CSS", level: 2 },
  { component: SiTailwindcss, name: "Tailwind CSS", level: 1 },
  { component: DiDjango, name: "Django", level: 1 },
  { component: SiKotlin, name: "Kotlin", level: 1 },
  { component: FaVuejs, name: "Vue.js", level: 0 },
  { component: SiFlask, name: "Flask", level: 0 },
  { component: SiLaravel, name: "Laravel", level: 0 },
  { component: SiGnubash, name: "Bash", level: 0 },
  { component: SiCplusplus, name: "C++", level: 0 },
  { component: FaFileExcel, name: "VBA", level: 0 },
  { component: SiNestjs, name: "Nest.js", level: 0 },
];

function Techstack() {
  const { t } = useTranslation();
  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {icons.map((icon, index) => {
          const IconComponent = icon.component;

          // Déterminer classe CSS avec niveau
          const levelClass =
            icon.level === 0 ? "border-orange" : icon.level === 1 ? "border-yellow" :  icon.level === 2 ? "border-green" : "border-blue";

          return (
            <Col
              key={index}
              xs={4}
              md={2}
              className={`tech-icons ${levelClass}`} 
              data-tip={`${icon.name} - ${icon.level === 0 ? t('novice') : icon.level === 1 ? t('intermediate') : icon.level === 2 ? t('advanced') : t('favorite')}`}
            >
              <IconComponent aria-label={icon.name} />
            </Col>
          );
        })}
      </Row>
      <ReactTooltip />
    </div>
  );
}

export default Techstack;
