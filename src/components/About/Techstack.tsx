import React, { Suspense, useState } from "react";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons";
import { SiFlutter } from "@react-icons/all-files/si/SiFlutter";
import { DiReact } from "@react-icons/all-files/di/DiReact";
import { DiNodejs } from "@react-icons/all-files/di/DiNodejs";
import { SiTailwindcss } from "@react-icons/all-files/si/SiTailwindcss";
import { DiMysql } from "@react-icons/all-files/di/DiMysql";
import { SiBootstrap } from "@react-icons/all-files/si/SiBootstrap";
import { SiCss3 } from "@react-icons/all-files/si/SiCss3";
import { FaJava } from "@react-icons/all-files/fa/FaJava";
import { DiJavascript1 } from "@react-icons/all-files/di/DiJavascript1";
import { SiTypescript } from "@react-icons/all-files/si/SiTypescript";
import { SiHtml5 } from "@react-icons/all-files/si/SiHtml5";
import { DiPython } from "@react-icons/all-files/di/DiPython";
import { DiPhp } from "@react-icons/all-files/di/DiPhp";
import { DiScala } from "@react-icons/all-files/di/DiScala";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { DiWordpress } from "@react-icons/all-files/di/DiWordpress";
import { FaWix } from "@react-icons/all-files/fa/FaWix";
import { FaVuejs } from "@react-icons/all-files/fa/FaVuejs";
import { FaCloud } from "@react-icons/all-files/fa/FaCloud";
import { SiNginx } from "@react-icons/all-files/si/SiNginx";
import { SiGnubash } from "@react-icons/all-files/si/SiGnubash";
import { DiDjango } from "@react-icons/all-files/di/DiDjango";
import { SiPostgresql } from "@react-icons/all-files/si/SiPostgresql";
import { FaFileExcel } from "@react-icons/all-files/fa/FaFileExcel";
import { SiAngular } from "@react-icons/all-files/si/SiAngular";
import { SiNetlify } from "@react-icons/all-files/si/SiNetlify";
import { FaAws } from "@react-icons/all-files/fa/FaAws";
import { SiNuxtDotJs } from "@react-icons/all-files/si/SiNuxtDotJs";
import { SiCplusplus } from "@react-icons/all-files/si/SiCplusplus";
import { SiKotlin } from "@react-icons/all-files/si/SiKotlin";
import { SiFlask } from "@react-icons/all-files/si/SiFlask";
import { SiHeroku } from "@react-icons/all-files/si/SiHeroku";
import { SiGraphql } from "@react-icons/all-files/si/SiGraphql";
import { SiRust } from "@react-icons/all-files/si/SiRust";
import { SiLaravel } from "@react-icons/all-files/si/SiLaravel";
import { SiSwift } from "@react-icons/all-files/si/SiSwift";
import "../../assets/styles/About/About.css";

type IconData = {
  component: IconType;
  name: string;
  level: number;
  category: string;
};

const categories = [
  "All",
  "Programming Languages",
  "Front-End",
  "Back-End",
  "Database",
  "Hosting",
  "Mobile",
  "CMS",
];

const icons: IconData[] = [
  { component: SiFlutter, name: "Flutter", level: 3, category: "Mobile" },
  { component: DiReact, name: "React", level: 3, category: "Front-End" },
  { component: DiNodejs, name: "Node.js", level: 3, category: "Back-End" },
  { component: SiTailwindcss, name: "Tailwind", level: 3, category: "Front-End" },
  { component: DiMysql, name: "MySQL", level: 3, category: "Database" },

  { component: SiBootstrap, name: "Bootstrap", level: 2, category: "Front-End" },
  { component: SiCss3, name: "CSS", level: 2, category: "Front-End" },
  { component: FaJava, name: "Java", level: 2, category: "Programming Languages" },
  { component: DiJavascript1, name: "JavaScript", level: 2, category: "Programming Languages" },
  { component: SiTypescript, name: "TypeScript", level: 3, category: "Programming Languages" },
  { component: SiHtml5, name: "HTML", level: 2, category: "Front-End" },
  { component: DiPython, name: "Python", level: 2, category: "Programming Languages" },
  { component: DiPhp, name: "PHP", level: 2, category: "Programming Languages" },
  { component: DiScala, name: "Scala", level: 2, category: "Programming Languages" },
  { component: FaCheck, name: "Why3", level: 2, category: "Programming Languages" },
  { component: DiWordpress, name: "Wordpress - CMS", level: 2, category: "CMS" },
  { component: FaWix, name: "Wix - CMS", level: 2, category: "CMS" },
  { component: FaVuejs, name: "Vue.js", level: 2, category: "Front-End" },
  { component: FaCloud, name: "Vercel", level: 2, category: "Hosting" },
  { component: SiNginx, name: "Nginx", level: 2, category: "Hosting" },

  { component: SiGnubash, name: "Bash", level: 1, category: "Programming Languages" },
  { component: DiDjango, name: "Django", level: 2, category: "Back-End" },
  { component: SiPostgresql, name: "PostgreSQL", level: 1, category: "Database" },
  { component: FaFileExcel, name: "VBA", level: 1, category: "Programming Languages" },
  { component: SiAngular, name: "Angular", level: 1, category: "Front-End" },
  { component: SiNetlify, name: "Netlify", level: 1, category: "Hosting" },
  { component: FaAws, name: "AWS", level: 1, category: "Hosting" },
  { component: SiNuxtDotJs, name: "Nuxt", level: 1, category: "Front-End" },
  { component: SiCplusplus, name: "C++", level: 1, category: "Programming Languages" },
  { component: SiKotlin, name: "Kotlin", level: 1, category: "Mobile" },
  { component: SiFlask, name: "Flask", level: 1, category: "Back-End" },

  { component: SiHeroku, name: "Heroku", level: 0, category: "Hosting" },
  { component: SiGraphql, name: "GraphQL", level: 0, category: "Back-End" },
  { component: SiRust, name: "Rust", level: 0, category: "Back-End" },
  { component: SiLaravel, name: "Laravel", level: 0, category: "Back-End" },
  { component: DiNodejs, name: "Nest.js", level: 0, category: "Back-End" },
  { component: SiSwift, name: "Swift", level: 0, category: "Mobile" },
];

const Tooltip = React.lazy(() => import("react-tooltip").then((module) => ({ default: module.Tooltip })));

function Techstack() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<number | "All">("All");

  return (
    <div>
      <div className="level-legend pb-5">
        <span
          className={`level-badge all ${selectedLevel === "All" ? "active" : ""}`}
          onClick={() => setSelectedLevel("All")}
        >
          {t("all")}
        </span>
        <span
          className={`level-badge novice ${selectedLevel === 0 ? "active" : ""}`}
          onClick={() => setSelectedLevel(0)}
        >
          {t("novice")}
        </span>
        <span
          className={`level-badge intermediate ${selectedLevel === 1 ? "active" : ""}`}
          onClick={() => setSelectedLevel(1)}
        >
          {t("intermediate")}
        </span>
        <span
          className={`level-badge advanced ${selectedLevel === 2 ? "active" : ""}`}
          onClick={() => setSelectedLevel(2)}
        >
          {t("advanced")}
        </span>
        <span
          className={`level-badge favorite ${selectedLevel === 3 ? "active" : ""}`}
          onClick={() => setSelectedLevel(3)}
        >
          {t("favorite2")}
        </span>
      </div>

      <div className="category-buttons" style={{ textAlign: "center", marginBottom: "20px" }}>
        {categories.map((cat) => {
          const translatedLabel = ["Back-End", "Front-End"].includes(cat) ? cat : t(`categories.${cat}`);

          return (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "primary" : "outline-secondary"}
              onClick={() => setSelectedCategory(cat)}
              style={{ margin: "5px" }}
            >
              {translatedLabel}
            </Button>
          );
        })}
      </div>

      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {icons
          .filter(
            (icon) =>
              (selectedCategory === "All" || icon.category === selectedCategory) &&
              (selectedLevel === "All"
                ? true
                : selectedLevel === 2
                  ? icon.level === 2 || icon.level === 3
                  : icon.level === selectedLevel),
          )
          .sort((a, b) => b.level - a.level)
          .map((icon, index) => {
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
                xs={3}
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
                <IconComponent aria-label={icon.name} />
              </Col>
            );
          })}
      </Row>

      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <Tooltip id="tech-tooltip" anchorSelect=".tech-icons" place="top" />
      </Suspense>
    </div>
  );
}

export default Techstack;
