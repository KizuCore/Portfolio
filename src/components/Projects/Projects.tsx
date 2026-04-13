import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCards";
import { easeOut, motion } from "framer-motion";

import "../../assets/styles/About/About.css";
import "../../assets/styles/Projet/Projet.css";

import lemonmaze from "@image/Projects/LemonMaze.webp";
import cosmiclink from "@image/Projects/CosmicLink.webp";
import chrono from "@image/Projects/chrono.webp";
import tboi from "@image/Projects/TBOI.webp";
import breizhcoin from "@image/Projects/breizhcoin.webp";
import portfolio from "@image/Projects/portfolio.webp";
import portfoliov2 from "@image/Projects/portfoliov2.webp";
import apibook from "@image/Projects/apibook.webp";
import flambow from "@image/Projects/flambowImg.webp";
import flambowFrontend from "@image/Projects/FlambowFrontEnd.png";
import badmintonapi from "@image/Projects/badmintonapi.webp";
import Particle from "../../utils/Particle";

type ProjectCategory = "web" | "mobile" | "api" | "game";
type ProjectFilter = "all" | ProjectCategory;

interface ProjectItem {
  imgPath: string;
  altTextKey: string;
  titleKey: string;
  descriptionKey: string;
  ghLink: string;
  isGitLab?: boolean;
  youtubeLink?: string;
  seeLink?: string;
  techStack: string[];
  category: ProjectCategory;
  featured?: boolean;
  pinTop?: boolean;
  imageMode?: "cover" | "contain";
}

const projects: ProjectItem[] = [
  {
    imgPath: portfoliov2,
    altTextKey: "categories_projects.portfoliov2_image_alt",
    titleKey: "categories_projects.portfolio_v2_title",
    descriptionKey: "categories_projects.portfolio_v2_description",
    ghLink: "https://github.com/KizuCore/Portfolio",
    techStack: ["React", "Bootstrap", "Css", "NodeJS", "Axios", "Typescript"],
    category: "web",
    featured: true,
  },
  {
    imgPath: apibook,
    altTextKey: "categories_projects.apibook_image_alt",
    titleKey: "categories_projects.library_title",
    descriptionKey: "categories_projects.library_description",
    ghLink: "https://github.com/KizuCore/MDS-M1-Librairie",
    techStack: ["NodeJS", "Swagger", "MySQL", "React", "Bootstrap", "Sequelize"],
    category: "api",
    featured: true,
  },
  {
    imgPath: lemonmaze,
    altTextKey: "categories_projects.lemonmaze_image_alt",
    titleKey: "categories_projects.lemonmaze_title",
    descriptionKey: "categories_projects.lemonmaze_description",
    ghLink: "https://github.com/KizuCore/Lemon_Maze",
    techStack: ["Flutter"],
    category: "mobile",
    featured: true,
  },
  {
    imgPath: lemonmaze,
    altTextKey: "categories_projects.lemonmaze_image_alt",
    titleKey: "categories_projects.lemonmaze_api_title",
    descriptionKey: "categories_projects.lemonmaze_api_description",
    ghLink: "https://github.com/KizuCore/APILemonMaze",
    techStack: ["NodeJS", "Swagger", "MySQL"],
    category: "api",
  },
  {
    imgPath: badmintonapi,
    altTextKey: "categories_projects.badmintonapi_image_alt",
    titleKey: "categories_projects.badmintonapi_title",
    descriptionKey: "categories_projects.badmintonapi_description",
    ghLink: "https://github.com/KizuCore/projet-api-badminton",
    techStack: ["NodeJS", "Swagger", "MySQL", "GraphQL"],
    category: "api",
  },
  {
    imgPath: cosmiclink,
    altTextKey: "categories_projects.cosmiclink_image_alt",
    titleKey: "categories_projects.cosmiclink_title",
    descriptionKey: "categories_projects.cosmiclink_description",
    ghLink: "https://github.com/KizuCore/CosmicLink",
    youtubeLink: "https://youtube.com/watch?v=3yVybmKT5d0",
    techStack: ["Php", "Javascript", "Html", "Css"],
    category: "web",
  },
  {
    imgPath: flambow,
    altTextKey: "categories_projects.flambow_image_alt",
    titleKey: "categories_projects.flambow_title",
    descriptionKey: "categories_projects.flambow_description",
    ghLink: "https://github.com/KizuCore/Flambow",
    seeLink: "https://flambow-m7iu4q0gi-theo22100s-projects.vercel.app/",
    techStack: ["React", "Javascript", "Bootstrap", "Css", "Axios"],
    category: "web",
  },
  {
    imgPath: flambowFrontend,
    altTextKey: "categories_projects.flambow_frontend_image_alt",
    titleKey: "categories_projects.flambow_frontend_title",
    descriptionKey: "categories_projects.flambow_frontend_description",
    ghLink: "https://gitlab.com/Theo22100/flambow-front",
    isGitLab: true,
    youtubeLink: "https://youtu.be/-TLaRV4pO2s?si=MLq_zy-hdlk9pjF3",
    seeLink: "https://flambow.fr",
    techStack: ["React", "Typescript", "Vite", "Docker", "GitLab CI", "Playwright", "Vitest"],
    category: "web",
    featured: true,
    pinTop: true,
    imageMode: "contain",
  },
  {
    imgPath: chrono,
    altTextKey: "categories_projects.chrono_image_alt",
    titleKey: "categories_projects.minuteur_mobile_title",
    descriptionKey: "categories_projects.minuteur_mobile_description",
    ghLink: "https://github.com/KizuCore/MDS-ExamMobile2024",
    techStack: ["Kotlin"],
    category: "mobile",
  },
  {
    imgPath: breizhcoin,
    altTextKey: "categories_projects.breizhcoin_image_alt",
    titleKey: "categories_projects.breizhcoin_title",
    descriptionKey: "categories_projects.breizhcoin_description",
    ghLink: "https://github.com/KizuCore/BreizhCoin",
    youtubeLink: "https://youtu.be/OqgS7SW_8tU",
    techStack: ["Php", "Javascript", "Html", "Css"],
    category: "web",
  },
  {
    imgPath: tboi,
    altTextKey: "categories_projects.tboi_image_alt",
    titleKey: "categories_projects.thebindingofisaac_title",
    descriptionKey: "categories_projects.thebindingofisaac_description",
    ghLink: "https://github.com/KizuCore/TheBindingOfIsaac",
    techStack: ["Java"],
    category: "game",
  },
  {
    imgPath: portfolio,
    altTextKey: "categories_projects.portfolio_image_alt",
    titleKey: "categories_projects.portfolio_v1_title",
    descriptionKey: "categories_projects.portfolio_v1_description",
    ghLink: "https://github.com/KizuCore/Old-PortFolio",
    seeLink: "https://theo-guerin.netlify.app/",
    techStack: ["Vuejs", "Javascript", "Html", "Css"],
    category: "web",
  },
];

const filterOrder: ProjectFilter[] = ["all", "web", "mobile", "api", "game"];

const filterLabels: Record<string, Record<ProjectFilter, string>> = {
  fr: {
    all: "Tous",
    web: "Web",
    mobile: "Mobile",
    api: "API",
    game: "Jeu",
  },
  en: {
    all: "All",
    web: "Web",
    mobile: "Mobile",
    api: "API",
    game: "Game",
  },
  es: {
    all: "Todo",
    web: "Web",
    mobile: "Movil",
    api: "API",
    game: "Juego",
  },
  bzh: {
    all: "Holl",
    web: "Web",
    mobile: "Hezoug",
    api: "API",
    game: "C'hoari",
  },
};

const featuredPillLabel: Record<string, string> = {
  fr: "Selection",
  en: "Top Pick",
  es: "Seleccion",
  bzh: "Dibabet",
};

const explorerLabels: Record<
  string,
  {
    browse: string;
    previous: string;
    next: string;
    empty: string;
    position: string;
  }
> = {
  fr: {
    browse: "Parcourir les projets",
    previous: "Precedent",
    next: "Suivant",
    empty: "Aucun projet pour ce filtre.",
    position: "Projet {{current}} sur {{total}}",
  },
  en: {
    browse: "Browse projects",
    previous: "Previous",
    next: "Next",
    empty: "No project for this filter.",
    position: "Project {{current}} of {{total}}",
  },
  es: {
    browse: "Explorar proyectos",
    previous: "Anterior",
    next: "Siguiente",
    empty: "No hay proyectos para este filtro.",
    position: "Proyecto {{current}} de {{total}}",
  },
  bzh: {
    browse: "Furchal ar raktresoù",
    previous: "Kent",
    next: "War-lerc'h",
    empty: "N'eus raktres ebet evit ar sil-se.",
    position: "Raktres {{current}} diwar {{total}}",
  },
};

const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = React.useState<ProjectFilter>("all");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const currentLanguage = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const currentFilterLabels = filterLabels[currentLanguage] || filterLabels.en;
  const currentFeaturedPillLabel = featuredPillLabel[currentLanguage] || featuredPillLabel.en;
  const currentExplorerLabels = explorerLabels[currentLanguage] || explorerLabels.en;

  const sortedProjects = React.useMemo(
    () =>
      [...projects].sort((a, b) => {
        const pinTopPriority = Number(Boolean(b.pinTop)) - Number(Boolean(a.pinTop));
        if (pinTopPriority !== 0) {
          return pinTopPriority;
        }

        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      }),
    []
  );

  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "all") {
      return sortedProjects;
    }

    return sortedProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter, sortedProjects]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [activeFilter]);

  React.useEffect(() => {
    if (selectedIndex >= filteredProjects.length) {
      setSelectedIndex(Math.max(filteredProjects.length - 1, 0));
    }
  }, [filteredProjects, selectedIndex]);

  const selectedProject = filteredProjects[selectedIndex] || null;

  const positionText = currentExplorerLabels.position
    .replace("{{current}}", String(selectedProject ? selectedIndex + 1 : 0))
    .replace("{{total}}", String(filteredProjects.length));

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
            {filterOrder.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  className={`project-filter-chip ${isActive ? "active" : ""}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                >
                  {currentFilterLabels[filter]}
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
          <aside className="project-nav" aria-label={currentExplorerLabels.browse}>
            <p className="project-nav-title">{currentExplorerLabels.browse}</p>
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
                    <span className="project-nav-name">{t(project.titleKey)}</span>
                    {project.featured && (
                      <span className="project-nav-featured">{currentFeaturedPillLabel}</span>
                    )}
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
                      {currentExplorerLabels.previous}
                    </button>
                    <button
                      type="button"
                      className="project-switch-btn"
                      onClick={() =>
                        setSelectedIndex((prev) => Math.min(prev + 1, filteredProjects.length - 1))
                      }
                      disabled={selectedIndex === filteredProjects.length - 1}
                    >
                      {currentExplorerLabels.next}
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
                    featuredLabel={currentFeaturedPillLabel}
                    imageMode={selectedProject.imageMode}
                  />
                </motion.div>
              </>
            ) : (
              <p className="project-empty">{currentExplorerLabels.empty}</p>
            )}
          </div>
        </motion.div>
      </Container>
    </Container>
  );
};

export default Projects;
