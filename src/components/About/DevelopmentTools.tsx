import React, { Suspense, useState } from "react";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import "../../assets/styles/About/About.css";
import { easeOut, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TOOL_CATEGORIES, TOOLS } from "./data/tools";

const Tooltip = React.lazy(() => import("react-tooltip").then((module) => ({ default: module.Tooltip })));

const ToolStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { t } = useTranslation();

  return (
    <div>
      <motion.h2
        className="custom-title custom-title-1 my-5 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        {t("tools")} {t("i_use")}
      </motion.h2>

      <div className="category-buttons stack-filter-buttons">
        {TOOL_CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "primary" : "outline-secondary"}
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
            const IconComponent = tool.component;
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
                  <IconComponent aria-hidden="true" />
                </div>
                <div className="tech-icon-label">{tool.name}</div>
              </Col>
            );
          })}
      </Row>

      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <Tooltip id="tool-tooltip" anchorSelect=".tech-icons-1" place="top" />
      </Suspense>
    </div>
  );
};

export default ToolStack;
