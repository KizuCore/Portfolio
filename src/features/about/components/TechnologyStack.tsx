import React, { Suspense, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { TECH_CATEGORIES, TECH_SKILLS, type SkillFilter } from "../data/techStack";
import "../styles/About.css";

const StackIcon = React.lazy(() => import("./StackIcon"));
const iconPlaceholder = <svg aria-hidden="true" width="1em" height="1em" />;

const Tooltip = React.lazy(() => import("react-tooltip").then((module) => ({ default: module.Tooltip })));

function TechStack() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px 0px" });
  const [selectedCategory, setSelectedCategory] = useState<SkillFilter>("All");
  const [selectedLevel, setSelectedLevel] = useState<number | "All" | "Favorite">("All");

  return (
    <div ref={ref}>
      <fieldset className="skill-level-filter">
        <legend>{t("skill_level_filter")}</legend>
        <div className="level-legend">
        <button
          type="button"
          className={`level-badge all ${selectedLevel === "All" ? "active" : ""}`}
          aria-pressed={selectedLevel === "All"}
          onClick={() => setSelectedLevel("All")}
        >
          {t("all")}
        </button>
        <button
          type="button"
          className={`level-badge novice ${selectedLevel === 0 ? "active" : ""}`}
          aria-pressed={selectedLevel === 0}
          onClick={() => setSelectedLevel(0)}
        >
          {t("novice")}
        </button>
        <button
          type="button"
          className={`level-badge intermediate ${selectedLevel === 1 ? "active" : ""}`}
          aria-pressed={selectedLevel === 1}
          onClick={() => setSelectedLevel(1)}
        >
          {t("intermediate")}
        </button>
        <button
          type="button"
          className={`level-badge advanced ${selectedLevel === 2 ? "active" : ""}`}
          aria-pressed={selectedLevel === 2}
          onClick={() => setSelectedLevel(2)}
        >
          {t("advanced")}
        </button>
        <button
          type="button"
          className={`level-badge favorite ${selectedLevel === "Favorite" ? "active" : ""}`}
          aria-pressed={selectedLevel === "Favorite"}
          onClick={() => setSelectedLevel("Favorite")}
        >
          {t("favorite2")}
        </button>
      </div>

      </fieldset>

      <div className="category-buttons stack-filter-buttons">
        {TECH_CATEGORIES.map((cat) => {
          const translatedLabel = t(`categories.${cat}`);

          return (
            <button type="button"
              key={cat}
              aria-pressed={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className="stack-filter-button"
            >
              {translatedLabel}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-[0.65rem] min-[576px]:grid-cols-4 min-[576px]:gap-4 min-[992px]:grid-cols-6">
        {[...TECH_SKILLS]
          .filter(
            (icon) =>
              (selectedCategory === "All" || icon.category === selectedCategory) &&
              (selectedLevel === "All"
                ? true
                : selectedLevel === "Favorite"
                  ? Boolean(icon.favorite)
                  : icon.level === selectedLevel),
          )
          .sort((a, b) => b.level - a.level || Number(Boolean(b.favorite)) - Number(Boolean(a.favorite)))
          .map((icon, index) => {
            const levelClass =
              icon.level === 0
                ? "border-orange"
                : icon.level === 1
                  ? "border-yellow"
                  : "border-green";

            return (
              <div
                key={index}
                className={`tech-icons ${levelClass}${icon.favorite ? " is-favorite" : ""}`}
                data-tooltip-id="tech-tooltip"
                data-tooltip-content={`${icon.name} - ${icon.level === 0
                  ? t("novice")
                  : icon.level === 1
                    ? t("intermediate")
                    : t("advanced")
                  }${icon.favorite ? ` · ${t("favorite2")}` : ""}`}
              >
                <div className="tech-icon-glyph">
                  {inView ? <Suspense fallback={iconPlaceholder}><StackIcon name={icon.icon} /></Suspense> : iconPlaceholder}
                </div>
                <div className="tech-icon-label">{icon.name}</div>
              </div>
            );
          })}
      </div>

      {inView && <Suspense fallback={null}>
        <Tooltip id="tech-tooltip" anchorSelect=".tech-icons" place="top"
          className="stack-tooltip" noArrow offset={12} delayShow={150}
          render={({ content }) => {
            if (!content) return null;
            const separator = content.indexOf(" - ");
            if (separator < 0) return content;
            return <>
              <span className="stack-tooltip-name">{content.slice(0, separator)}</span>
              <span className="stack-tooltip-detail">{content.slice(separator + 3)}</span>
            </>;
          }} />
      </Suspense>}
    </div>
  );
}

export default TechStack;
