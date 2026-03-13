import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Tilt from "react-parallax-tilt";
import ProjectCard from "./ProjectCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "../../assets/styles/About/About.css";
import "../../assets/styles/Projet/Projet.css";
import "../../assets/styles/swiper-global.css";

// Images
import lemonmaze from "@image/Projects/LemonMaze.webp";
import cosmiclink from "@image/Projects/CosmicLink.webp";
import chrono from "@image/Projects/chrono.webp";
import tboi from "@image/Projects/TBOI.webp";
import breizhcoin from "@image/Projects/breizhcoin.webp";
import portfolio from "@image/Projects/portfolio.webp";
import portfoliov2 from "@image/Projects/portfoliov2.webp";
import apibook from "@image/Projects/apibook.webp";
import flambow from "@image/Projects/flambowImg.webp";
import badmintonapi from "@image/Projects/badmintonapi.webp";
import { easeOut, motion } from "framer-motion";
import Particle from "../../utils/Particle";

type ProjectCategory = "web" | "mobile" | "api" | "game";
type ProjectFilter = "all" | ProjectCategory;

interface ProjectItem {
  imgPath: string;
  altTextKey: string;
  titleKey: string;
  descriptionKey: string;
  ghLink: string;
  youtubeLink?: string;
  seeLink?: string;
  techStack: string[];
  category: ProjectCategory;
  featured?: boolean;
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
    techStack: ["React", "Javascript", "Bootstrap", "Css"],
    category: "web",
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

const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = React.useState<ProjectFilter>("all");
  const [isFinePointer, setIsFinePointer] = React.useState(() =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const enableTilt = isFinePointer && !prefersReducedMotion;
  const currentLanguage = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const currentFilterLabels = filterLabels[currentLanguage] || filterLabels.en;
  const currentFeaturedPillLabel = featuredPillLabel[currentLanguage] || featuredPillLabel.en;

  const sortedProjects = React.useMemo(
    () => [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))),
    []
  );

  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "all") {
      return sortedProjects;
    }

    return sortedProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter, sortedProjects]);

  React.useEffect(() => {
    const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateInteractionMode = () => {
      setIsFinePointer(pointerMedia.matches);
      setPrefersReducedMotion(motionMedia.matches);
    };

    updateInteractionMode();
    pointerMedia.addEventListener("change", updateInteractionMode);
    motionMedia.addEventListener("change", updateInteractionMode);

    return () => {
      pointerMedia.removeEventListener("change", updateInteractionMode);
      motionMedia.removeEventListener("change", updateInteractionMode);
    };
  }, []);

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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
        >
          <Swiper
            className="project-carousel-swiper"
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={filteredProjects.length > 3}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
          >
            {filteredProjects.map((project, index) => (
              <SwiperSlide key={index}>
                {enableTilt ? (
                  <Tilt
                    className={`project-tilt ${project.featured ? "is-featured" : ""}`}
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    transitionSpeed={350}
                    scale={1.005}
                    perspective={1100}
                    glareEnable={false}
                  >
                    <ProjectCard
                      imgPath={project.imgPath}
                      altText={t(project.altTextKey)}
                      title={t(project.titleKey)}
                      description={t(project.descriptionKey)}
                      ghLink={project.ghLink}
                      youtubeLink={project.youtubeLink}
                      seeLink={project.seeLink}
                      techStack={project.techStack}
                      featured={project.featured}
                      featuredLabel={currentFeaturedPillLabel}
                    />
                  </Tilt>
                ) : (
                  <div className={`project-tilt ${project.featured ? "is-featured" : ""}`}>
                    <ProjectCard
                      imgPath={project.imgPath}
                      altText={t(project.altTextKey)}
                      title={t(project.titleKey)}
                      description={t(project.descriptionKey)}
                      ghLink={project.ghLink}
                      youtubeLink={project.youtubeLink}
                      seeLink={project.seeLink}
                      techStack={project.techStack}
                      featured={project.featured}
                      featuredLabel={currentFeaturedPillLabel}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </Container>
  );
};

export default Projects;
