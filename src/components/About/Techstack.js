import React, { Suspense } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../Assets/style/About/About.css";

// Chargement différé des icônes
const icons = [
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiFlutter }))), name: "Flutter", level: 3 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiReact }))), name: "React", level: 3 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiExpress }))), name: "Express", level: 3 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiMysql }))), name: "MySQL", level: 2 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiBootstrap }))), name: "Bootstrap", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiPhp }))), name: "PHP", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiScala }))), name: "Scala", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiJavascript1 }))), name: "JavaScript", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiNodejs }))), name: "Node.js", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiPython }))), name: "Python", level: 2 },
  { component: React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaJava }))), name: "Java", level: 2 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiWordpress }))), name: "Wordpress", level: 2 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiCss3 }))), name: "CSS", level: 2 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiTailwindcss }))), name: "Tailwind CSS", level: 1 },
  { component: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiDjango }))), name: "Django", level: 1 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiKotlin }))), name: "Kotlin", level: 1 },
  { component: React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaVuejs }))), name: "Vue.js", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiFlask }))), name: "Flask", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiLaravel }))), name: "Laravel", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGnubash }))), name: "Bash", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiCplusplus }))), name: "C++", level: 0 },
  { component: React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaFileExcel }))), name: "VBA", level: 0 },
  { component: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiNestjs }))), name: "Nest.js", level: 0 },
];

// Chargement différé de ReactTooltip
const ReactTooltip = React.lazy(() => import("react-tooltip"));

function Techstack() {
  const { t } = useTranslation();

  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {icons.map((icon, index) => {
          const IconComponent = icon.component;
          const levelClass =
            icon.level === 0 ? "border-orange" : icon.level === 1 ? "border-yellow" : icon.level === 2 ? "border-green" : "border-blue";

          return (
            <Col
              key={index}
              xs={4}
              md={2}
              className={`tech-icons ${levelClass}`}
              data-tip={`${icon.name} - ${
                icon.level === 0 ? t("novice") : icon.level === 1 ? t("intermediate") : icon.level === 2 ? t("advanced") : t("favorite")
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
        <ReactTooltip />
      </Suspense>
    </div>
  );
}

export default Techstack;
