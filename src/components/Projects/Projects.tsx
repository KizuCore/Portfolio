import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCards";
import { easeOut, motion } from "framer-motion";

import "../../assets/styles/About/About.css";
import "../../assets/styles/Projet/Projet.css";
import Particle from "../../utils/Particle";
import { PROJECT_FILTERS, PROJECT_IMAGE_SOURCES, PROJECTS, type ProjectFilter } from "./projects.data";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = React.useState<ProjectFilter>("all");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const preloadedImagesRef = React.useRef<HTMLImageElement[]>([]);

  const sortedProjects = React.useMemo(
    // Priorité d'affichage : projets épinglés, puis projets mis en avant.
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
    // "all" conserve le tri principal; les autres filtres ne gardent
    // que la catégorie demandée en préservant cet ordre.
    if (activeFilter === "all") {
      return sortedProjects;
    }

    return sortedProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter, sortedProjects]);

  React.useEffect(() => {
    // Quand on change de filtre, on revient sur le premier projet du filtre.
    setSelectedIndex(0);
  }, [activeFilter]);

  React.useEffect(() => {
    // Évite un index hors limites si la liste filtrée raccourcit.
    if (selectedIndex >= filteredProjects.length) {
      setSelectedIndex(Math.max(filteredProjects.length - 1, 0));
    }
  }, [filteredProjects, selectedIndex]);

  const selectedProject = filteredProjects[selectedIndex] || null;

  React.useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const selectedImage = new Image();
    selectedImage.decoding = "async";
    selectedImage.src = selectedProject.imgPath;
    preloadedImagesRef.current = [
      selectedImage,
      ...preloadedImagesRef.current.filter((image) => image.src !== selectedImage.src),
    ];
  }, [selectedProject]);

  React.useEffect(() => {
    const preloadLinks = PROJECT_IMAGE_SOURCES.map((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      return link;
    });

    const preloadImages = () => {
      preloadedImagesRef.current = PROJECT_IMAGE_SOURCES.map((src) => {
        const image = new Image();
        image.decoding = "async";
        image.src = src;
        return image;
      });
    };

    const cleanupPreloadLinks = () => {
      preloadLinks.forEach((link) => link.remove());
    };

    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (win.requestIdleCallback) {
      const handle = win.requestIdleCallback(preloadImages, { timeout: 1000 });
      return () => {
        win.cancelIdleCallback?.(handle);
        cleanupPreloadLinks();
      };
    }

    const handle = window.setTimeout(preloadImages, 150);
    return () => {
      window.clearTimeout(handle);
      cleanupPreloadLinks();
    };
  }, []);

  const featuredPillLabel = t("project_featured_label");
  const positionText = t("project_explorer.position", {
    current: selectedProject ? selectedIndex + 1 : 0,
    total: filteredProjects.length,
  });

  return (
    <Container fluid className="project-section text-center">
      <Particle />

      <Container>
        <motion.h1
          className="custom-title pt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t("my_projects")} {t("projects")}
        </motion.h1>

        <motion.p
          className="projects-intro"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
        >
          {t("projects_description")}
        </motion.p>

        <motion.div
          className="project-filter-shell"
          initial={{ opacity: 0, y: 20 }}
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
                  onClick={() => setActiveFilter(filter)}
                >
                  {t(`project_filters.${filter}`)}
                </button>
              );
            })}
          </div>
          <div className="project-filter-count">
            {filteredProjects.length} {t("projects")}
          </div>
        </motion.div>

        <motion.div
          className="project-explorer"
          initial={{ opacity: 0, y: 24 }}
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
                  >
                    <span className="project-nav-index">{String(index + 1).padStart(2, "0")}</span>
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

          <div className="project-detail">
            {selectedProject ? (
              <>
                <div className="project-detail-toolbar">
                  <p className="project-detail-position">{positionText}</p>
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
                  initial={{ opacity: 0, y: 10 }}
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
  );
};

export default Projects;
