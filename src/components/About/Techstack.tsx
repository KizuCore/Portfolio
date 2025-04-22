import React, { Suspense } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import type { ComponentType } from "react";
import "../../assets/styles/About/About.css";

// Type de l'icône avec typage pour TSX
type IconData = {
  component: React.LazyExoticComponent<ComponentType<any>>;
  name: string;
  level: number;
};

// Liste des icônes avec lazy loading et niveau de maîtrise
const icons: IconData[] = [
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiFlutter }))), name: "Flutter", level: 3 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiReact }))), name: "React", level: 3 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiExpress }))), name: "Express", level: 3 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiNodejs }))), name: "Node.js", level: 3 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiSequelize }))), name: "Sequelize - ORM", level: 3 },

  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiBootstrap }))), name: "Bootstrap", level: 2 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiCss3 }))), name: "CSS", level: 2 },
  { component: React.lazy(() => import("react-icons/fa").then(m => ({ default: m.FaJava }))), name: "Java", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiJavascript1 }))), name: "JavaScript", level: 2 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiHtml5 }))), name: "HTML", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiPython }))), name: "Python", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiMysql }))), name: "MySQL", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiPhp }))), name: "PHP", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiScala }))), name: "Scala", level: 2 },
  { component: React.lazy(() => import("react-icons/fa").then(m => ({ default: m.FaCheck }))), name: "Why3", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiWordpress }))), name: "Wordpress - CMS", level: 2 },
  { component: React.lazy(() => import("react-icons/fa").then(m => ({ default: m.FaWix }))), name: "Wix - CMS", level: 2 },

  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiGnubash }))), name: "Bash", level: 1 },
  { component: React.lazy(() => import("react-icons/di").then(m => ({ default: m.DiDjango }))), name: "Django", level: 1 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiPostgresql }))), name: "PostgresSQL", level: 1 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiTailwindcss }))), name: "Tailwind", level: 1 },
  { component: React.lazy(() => import("react-icons/fa").then(m => ({ default: m.FaFileExcel }))), name: "VBA", level: 1 },
  { component: React.lazy(() => import("react-icons/fa").then(m => ({ default: m.FaVuejs }))), name: "Vue.js", level: 1 },

  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiAngular }))), name: "Angular", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiCplusplus }))), name: "C++", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiFlask }))), name: "Flask", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiKotlin }))), name: "Kotlin", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiLaravel }))), name: "Laravel", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(m => ({ default: m.SiNestjs }))), name: "Nest.js", level: 0 },
];

const Tooltip = React.lazy(() => import("react-tooltip").then(module => ({ default: module.Tooltip })));


function Techstack() {
  const { t } = useTranslation();

  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {icons.map((icon, index) => {
          const IconComponent = icon.component;
          const levelClass =
            icon.level === 0
              ? "border-orange"
              : icon.level === 1
              ? "border-yellow"
              : icon.level === 2
              ? "border-green"
              : "border-blue";

          return (
            <Col
              key={index}
              xs={4}
              md={2}
              className={`tech-icons ${levelClass}`}
              data-tooltip-id="tech-tooltip"
              data-tooltip-content={`${icon.name} - ${
                icon.level === 0
                  ? t("novice")
                  : icon.level === 1
                  ? t("intermediate")
                  : icon.level === 2
                  ? t("advanced")
                  : t("favorite")
              }`}
            >
              <Suspense fallback={<Spinner animation="border" role="status" />}>
                <IconComponent aria-label={icon.name} />
              </Suspense>
            </Col>
          );
        })}
      </Row>
      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <Tooltip id="tech-tooltip"anchorSelect=".tech-icons" place="top" />
      </Suspense>
    </div>
  );
}

export default Techstack;
