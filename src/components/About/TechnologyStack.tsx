import React, { Suspense, useState } from "react";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TECH_CATEGORIES, TECH_SKILLS, type SkillFilter } from "./data/techStack";
import "../../assets/styles/About/About.css";

const Tooltip = React.lazy(() => import("react-tooltip").then((module) => ({ default: module.Tooltip })));

function TechStack() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<SkillFilter>("All");
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

      <div className="category-buttons stack-filter-buttons">
        {TECH_CATEGORIES.map((cat) => {
          const translatedLabel = t(`categories.${cat}`);

          return (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "primary" : "outline-secondary"}
              onClick={() => setSelectedCategory(cat)}
              className="stack-filter-button"
            >
              {translatedLabel}
            </Button>
          );
        })}
      </div>

      <Row className="stack-icons-row">
        {[...TECH_SKILLS]
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
                data-tooltip-content={`${icon.name} - ${icon.level === 0
                  ? t("novice")
                  : icon.level === 1
                    ? t("intermediate")
                    : icon.level === 2
                      ? t("advanced")
                      : t("favorite")
                  }`}
              >
                <div className="tech-icon-glyph">
                  <IconComponent aria-hidden="true" />
                </div>
                <div className="tech-icon-label">{icon.name}</div>
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

export default TechStack;
