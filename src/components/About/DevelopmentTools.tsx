import React, { Suspense, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import "../../assets/styles/About/About.css";
import { useTranslation } from "react-i18next";
import { TOOL_CATEGORIES, TOOLS } from "./data/tools";

const StackIcon = React.lazy(() => import("./StackIcon"));
const iconPlaceholder = <svg aria-hidden="true" width="1em" height="1em" />;

const Tooltip = React.lazy(() => import("react-tooltip").then((module) => ({ default: module.Tooltip })));

const ToolStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px 0px" });

  return (
    <section className="about-skills-section" aria-labelledby="about-tools-title" ref={ref}>
      <h2
        id="about-tools-title"
        className="about-section-title"
      >
        {t("tools")} {t("i_use")}
      </h2>

      <div className="category-buttons stack-filter-buttons">
        {TOOL_CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "primary" : "outline-secondary"}
            aria-pressed={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            className="stack-filter-button"
          >
            {t(`categories.${cat}`)}
          </Button>
        ))}
      </div>

      <Row className="stack-icons-row">
        {[...TOOLS]
          .filter((tool) => selectedCategory === "All" || tool.category === selectedCategory)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tool, index) => {
            return (
              <Col
                key={index}
                xs={3}
                md={2}
                className="tech-icons-1"
                data-tooltip-id="tool-tooltip"
                data-tooltip-content={tool.name}
              >
                <div className="tech-icon-glyph">
                  {inView ? <Suspense fallback={iconPlaceholder}><StackIcon name={tool.icon} /></Suspense> : iconPlaceholder}
                </div>
                <div className="tech-icon-label">{tool.name}</div>
              </Col>
            );
          })}
      </Row>

      {inView && <Suspense fallback={null}>
        <Tooltip id="tool-tooltip" anchorSelect=".tech-icons-1" place="top" />
      </Suspense>}
    </section>
  );
};

export default ToolStack;
