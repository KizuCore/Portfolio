import lemonmaze from "@image/Projects/LemonMaze.webp";
import cosmiclink from "@image/Projects/CosmicLink.webp";
import chrono from "@image/Projects/chrono.webp";
import aTable from "@image/Projects/aTable.webp";
import tboi from "@image/Projects/TBOI.webp";
import breizhcoin from "@image/Projects/breizhcoin.webp";
import portfolio from "@image/Projects/portfolio.webp";
import portfoliov2 from "@image/Projects/portfoliov2.webp";
import apibook from "@image/Projects/apibook.webp";
import flambow from "@image/Projects/flambowImg.webp";
import flambowFrontend from "@image/Projects/FlambowFrontEnd.webp";
import badmintonapi from "@image/Projects/badmintonapi.webp";
import portesDeMontafilan from "@image/Projects/portesDeMontafilan.webp";

export type ProjectCategory = "web" | "mobile" | "api" | "game";
export type ProjectFilter = "all" | ProjectCategory;

export type ProjectItem = {
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
};

export const PROJECT_FILTERS: ProjectFilter[] = ["all", "web", "mobile", "api", "game"];

export const PROJECTS: ProjectItem[] = [
  {
    imgPath: portesDeMontafilan,
    altTextKey: "categories_projects.portes_montafilan_image_alt",
    titleKey: "categories_projects.portes_montafilan_title",
    descriptionKey: "categories_projects.portes_montafilan_description",
    ghLink: "https://github.com/KizuCore/PortesDeMontafilan",
    seeLink: "https://www.lesportesdemontafilan.com/",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vercel", "Brevo", "Vitest", "Playwright"],
    category: "web",
    featured: true,
    pinTop: true,
  },
  {
    imgPath: portfoliov2,
    altTextKey: "categories_projects.portfoliov2_image_alt",
    titleKey: "categories_projects.portfolio_v2_title",
    descriptionKey: "categories_projects.portfolio_v2_description",
    ghLink: "https://github.com/KizuCore/Portfolio",
    techStack: ["React", "Bootstrap", "CSS", "Node.js", "Axios", "TypeScript"],
    category: "web",
    featured: true,
  },
  {
    imgPath: apibook,
    altTextKey: "categories_projects.apibook_image_alt",
    titleKey: "categories_projects.library_title",
    descriptionKey: "categories_projects.library_description",
    ghLink: "https://github.com/KizuCore/MDS-M1-Librairie",
    techStack: ["Node.js", "Swagger", "MySQL", "React", "Bootstrap", "Sequelize"],
    category: "api",
  },
  {
    imgPath: lemonmaze,
    altTextKey: "categories_projects.lemonmaze_image_alt",
    titleKey: "categories_projects.lemonmaze_title",
    descriptionKey: "categories_projects.lemonmaze_description",
    ghLink: "https://github.com/KizuCore/Lemon_Maze",
    techStack: ["Flutter"],
    category: "mobile",
  },
  {
    imgPath: aTable,
    altTextKey: "categories_projects.atable_image_alt",
    titleKey: "categories_projects.atable_title",
    descriptionKey: "categories_projects.atable_description",
    ghLink: "https://github.com/KizuCore/a_table",
    techStack: ["Flutter", "Dart", "Riverpod", "Isar", "GoRouter", "TableCalendar", "Material 3"],
    category: "mobile",
    featured: true,
  },
  {
    imgPath: lemonmaze,
    altTextKey: "categories_projects.lemonmaze_image_alt",
    titleKey: "categories_projects.lemonmaze_api_title",
    descriptionKey: "categories_projects.lemonmaze_api_description",
    ghLink: "https://github.com/KizuCore/APILemonMaze",
    techStack: ["Node.js", "Swagger", "MySQL"],
    category: "api",
  },
  {
    imgPath: badmintonapi,
    altTextKey: "categories_projects.badmintonapi_image_alt",
    titleKey: "categories_projects.badmintonapi_title",
    descriptionKey: "categories_projects.badmintonapi_description",
    ghLink: "https://github.com/KizuCore/projet-api-badminton",
    techStack: ["Node.js", "Swagger", "MySQL", "GraphQL"],
    category: "api",
  },
  {
    imgPath: cosmiclink,
    altTextKey: "categories_projects.cosmiclink_image_alt",
    titleKey: "categories_projects.cosmiclink_title",
    descriptionKey: "categories_projects.cosmiclink_description",
    ghLink: "https://github.com/KizuCore/CosmicLink",
    youtubeLink: "https://youtube.com/watch?v=3yVybmKT5d0",
    techStack: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "web",
  },
  {
    imgPath: flambow,
    altTextKey: "categories_projects.flambow_image_alt",
    titleKey: "categories_projects.flambow_title",
    descriptionKey: "categories_projects.flambow_description",
    ghLink: "https://github.com/KizuCore/Flambow",
    seeLink: "https://flambow.vercel.app/",
    techStack: ["React", "JavaScript", "Bootstrap", "CSS", "Axios"],
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
    techStack: ["React", "TypeScript", "Vite", "Docker", "GitLab CI", "Playwright", "Vitest"],
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
    techStack: ["PHP", "JavaScript", "HTML", "CSS"],
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
    techStack: ["Vue.js", "JavaScript", "HTML", "CSS"],
    category: "web",
  },
];

export const PROJECT_IMAGE_SOURCES = Array.from(new Set(PROJECTS.map((project) => project.imgPath)));
