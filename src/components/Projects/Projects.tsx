import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import { easeOut, motion, MotionConfig, useReducedMotion } from "framer-motion";

import "../../assets/styles/About/About.css";
import "../../assets/styles/Projects/Projects.css";
import { PROJECT_FILTERS, PROJECTS, type ProjectFilter } from "./data/projects";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = React.useState<ProjectFilter>("all");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const sortedProjects = React.useMemo(
    // Affiche d’abord les projets épinglés, puis les projets mis en avant.
    () =>
      [...PROJECTS].sort((a, b) => {
        const pinTopPriority = Number(Boolean(b.pinTop)) - Number(Boolean(a.pinTop));
        if (pinTopPriority !== 0) {
          return pinTopPriority;
        }

        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      }),
    []
  );

  const filteredProjects = React.useMemo(() => {
    // "all" conserve l’ordre principal ; les autres filtres préservent cet ordre dans une catégorie.
    if (activeFilter === "all") {
      return sortedProjects;
    }

    return sortedProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter, sortedProjects]);

  React.useEffect(() => {
    // Revient au premier projet correspondant à chaque changement de filtre.
    setSelectedIndex(0);
  }, [activeFilter]);

  React.useEffect(() => {
    // Garde l’index sélectionné valide lorsque la liste filtrée raccourcit.
    if (selectedIndex >= filteredProjects.length) {
      setSelectedIndex(Math.max(filteredProjects.length - 1, 0));
    }
  }, [filteredProjects, selectedIndex]);

  const selectedProject = filteredProjects[selectedIndex] || null;

  const featuredPillLabel = t("project_featured_label");
  const positionText = t("project_explorer.position", {
    current: selectedProject ? selectedIndex + 1 : 0,
    total: filteredProjects.length,
  });

  return (
    <MotionConfig reducedMotion="user">
    <Container fluid className="project-section">

      <Container>
        <motion.h1
          className="projects-title"
          initial={{ opacity: reduceMotion ? 1 : 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t("my_projects")} {t("projects")}
        </motion.h1>

        <motion.p
          className="projects-intro"
          initial={{ opacity: reduceMotion ? 1 : 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
        >
          {t("projects_description")}
        </motion.p>

        <motion.div
          className="project-filter-shell"
          initial={{ opacity: reduceMotion ? 1 : 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
        >
          <div className="project-filter-bar" aria-label={t("project_aria")}>
            {PROJECT_FILTERS.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  className={`project-filter-chip ${isActive ? "active" : ""}`}
                  aria-pressed={isActive}
                  onClick={() => { setActiveFilter(filter); setSelectedIndex(0); }}
                >
                  {t(`project_filters.${filter}`)}
                </button>
              );
            })}
          </div>
          <div className="project-filter-count" role="status">
            {filteredProjects.length} {t("projects")}
          </div>
        </motion.div>

        <motion.div
          className="project-explorer"
          initial={{ opacity: reduceMotion ? 1 : 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.35 }}
        >
          <aside className="project-nav" aria-label={t("project_explorer.browse")}>
            <div className="project-nav-header">
              <p className="project-nav-title">{t("project_explorer.browse")}</p>
              <span className="project-nav-count">{filteredProjects.length}</span>
            </div>
            <div className="project-nav-list">
              {filteredProjects.map((project, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <button
                    key={`${project.ghLink}-${index}`}
                    type="button"
                    className={`project-nav-item ${isSelected ? "active" : ""}`}
                    onClick={() => setSelectedIndex(index)}
                    aria-current={isSelected ? "true" : undefined}
                    aria-controls="project-detail"
                  >
                    <img className="project-nav-thumbnail" src={project.thumbnailPath} width={112} height={86} alt="" loading="lazy" decoding="async" />
                    <span className="project-nav-copy">
                      <span className="project-nav-name">{t(project.titleKey)}</span>
                      <span className="project-nav-meta">
                        {t(`project_filters.${project.category}`)}
                        {project.featured && (
                          <span className="project-nav-featured">{featuredPillLabel}</span>
                        )}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="project-detail" id="project-detail">
            {selectedProject ? (
              <>
                <div className="project-detail-toolbar">
                  <p className="project-detail-position" role="status">{positionText}</p>
                  <div className="project-detail-switches">
                    <button
                      type="button"
                      className="project-switch-btn"
                      onClick={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
                      disabled={selectedIndex === 0}
                    >
                      {t("project_explorer.previous")}
                    </button>
                    <button
                      type="button"
                      className="project-switch-btn"
                      onClick={() =>
                        setSelectedIndex((prev) => Math.min(prev + 1, filteredProjects.length - 1))
                      }
                      disabled={selectedIndex === filteredProjects.length - 1}
                    >
                      {t("project_explorer.next")}
                    </button>
                  </div>
                </div>

                <motion.div
                  key={selectedProject.ghLink}
                  initial={{ opacity: reduceMotion ? 1 : 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                >
                  <ProjectCard
                    imgPath={selectedProject.imgPath}
                    altText={t(selectedProject.altTextKey)}
                    title={t(selectedProject.titleKey)}
                    description={t(selectedProject.descriptionKey)}
                    ghLink={selectedProject.ghLink}
                    isGitLab={selectedProject.isGitLab}
                    youtubeLink={selectedProject.youtubeLink}
                    seeLink={selectedProject.seeLink}
                    caseStudyPath={selectedProject.caseStudyPath}
                    techStack={selectedProject.techStack}
                    featured={selectedProject.featured}
                    featuredLabel={featuredPillLabel}
                    imageMode={selectedProject.imageMode}
                  />
                </motion.div>
              </>
            ) : (
              <p className="project-empty">{t("project_explorer.empty")}</p>
            )}
          </div>
        </motion.div>
      </Container>
    </Container>
    </MotionConfig>
  );
};

export default Projects;
