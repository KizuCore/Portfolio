export const SITE_PROFILE = {
  brandName: "KizuCore",
  displayName: "Théo Guérin",
  jobTitle: "Développeur freelance Full-Stack",
  email: "theo.guerin35000@gmail.com",
  city: "Rennes",
  postalCode: "35700",
  countryCode: "FR",
  regionCode: "FR-35",
  geoPosition: "48.117266;-1.677793",
  geoICBM: "48.117266, -1.677793",
  twitterHandle: "@KizuCore",
  previewImagePath: "/images/preview/previewsite.png",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/KizuCore",
  gitlab: "https://gitlab.com/Theo35000",
  linkedin: "https://www.linkedin.com/in/theo-guerin35/",
} as const;

export const EDUCATION_ORGANIZATIONS = [
  "Université Rennes 1 ISTIC",
  "My Digital School Rennes",
] as const;

export const PROFESSIONAL_TOPICS = [
  "React",
  "Django",
  "Python",
  "Node.js",
  "Flutter",
  "PostgreSQL",
  "Docker",
  "TypeScript",
] as const;

export const FREELANCE_OFFER = {
  dayRateFrom: 300,
  currency: "EUR",
  taxLabel: "HT",
  unitText: "DAY",
} as const;

export type ProjectCategory = "web" | "mobile" | "api" | "game";
export type ProjectFilter = "all" | ProjectCategory;

export type ProjectImageKey =
  | "aTable"
  | "apibook"
  | "badmintonapi"
  | "breizhcoin"
  | "chrono"
  | "cosmiclink"
  | "flambow"
  | "flambowFrontend"
  | "lemonmaze"
  | "portesDeMontafilan"
  | "portfolio"
  | "portfoliov2"
  | "tboi";

export type PortfolioProject = {
  imageKey: ProjectImageKey;
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

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    imageKey: "portesDeMontafilan",
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
    imageKey: "portfoliov2",
    altTextKey: "categories_projects.portfoliov2_image_alt",
    titleKey: "categories_projects.portfolio_v2_title",
    descriptionKey: "categories_projects.portfolio_v2_description",
    ghLink: "https://github.com/KizuCore/Portfolio",
    techStack: ["React", "Bootstrap", "CSS", "Node.js", "Axios", "TypeScript"],
    category: "web",
    featured: true,
  },
  {
    imageKey: "apibook",
    altTextKey: "categories_projects.apibook_image_alt",
    titleKey: "categories_projects.library_title",
    descriptionKey: "categories_projects.library_description",
    ghLink: "https://github.com/KizuCore/MDS-M1-Librairie",
    techStack: ["Node.js", "Swagger", "MySQL", "React", "Bootstrap", "Sequelize"],
    category: "api",
  },
  {
    imageKey: "lemonmaze",
    altTextKey: "categories_projects.lemonmaze_image_alt",
    titleKey: "categories_projects.lemonmaze_title",
    descriptionKey: "categories_projects.lemonmaze_description",
    ghLink: "https://github.com/KizuCore/Lemon_Maze",
    techStack: ["Flutter"],
    category: "mobile",
  },
  {
    imageKey: "aTable",
    altTextKey: "categories_projects.atable_image_alt",
    titleKey: "categories_projects.atable_title",
    descriptionKey: "categories_projects.atable_description",
    ghLink: "https://github.com/KizuCore/a_table",
    techStack: ["Flutter", "Dart", "Riverpod", "Isar", "GoRouter", "TableCalendar", "Material 3"],
    category: "mobile",
    featured: true,
  },
  {
    imageKey: "lemonmaze",
    altTextKey: "categories_projects.lemonmaze_image_alt",
    titleKey: "categories_projects.lemonmaze_api_title",
    descriptionKey: "categories_projects.lemonmaze_api_description",
    ghLink: "https://github.com/KizuCore/APILemonMaze",
    techStack: ["Node.js", "Swagger", "MySQL"],
    category: "api",
  },
  {
    imageKey: "badmintonapi",
    altTextKey: "categories_projects.badmintonapi_image_alt",
    titleKey: "categories_projects.badmintonapi_title",
    descriptionKey: "categories_projects.badmintonapi_description",
    ghLink: "https://github.com/KizuCore/projet-api-badminton",
    techStack: ["Node.js", "Swagger", "MySQL", "GraphQL"],
    category: "api",
  },
  {
    imageKey: "cosmiclink",
    altTextKey: "categories_projects.cosmiclink_image_alt",
    titleKey: "categories_projects.cosmiclink_title",
    descriptionKey: "categories_projects.cosmiclink_description",
    ghLink: "https://github.com/KizuCore/CosmicLink",
    youtubeLink: "https://youtube.com/watch?v=3yVybmKT5d0",
    techStack: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "web",
  },
  {
    imageKey: "flambow",
    altTextKey: "categories_projects.flambow_image_alt",
    titleKey: "categories_projects.flambow_title",
    descriptionKey: "categories_projects.flambow_description",
    ghLink: "https://github.com/KizuCore/Flambow",
    seeLink: "https://flambow.vercel.app/",
    techStack: ["React", "JavaScript", "Bootstrap", "CSS", "Axios"],
    category: "web",
  },
  {
    imageKey: "flambowFrontend",
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
    imageKey: "chrono",
    altTextKey: "categories_projects.chrono_image_alt",
    titleKey: "categories_projects.minuteur_mobile_title",
    descriptionKey: "categories_projects.minuteur_mobile_description",
    ghLink: "https://github.com/KizuCore/MDS-ExamMobile2024",
    techStack: ["Kotlin"],
    category: "mobile",
  },
  {
    imageKey: "breizhcoin",
    altTextKey: "categories_projects.breizhcoin_image_alt",
    titleKey: "categories_projects.breizhcoin_title",
    descriptionKey: "categories_projects.breizhcoin_description",
    ghLink: "https://github.com/KizuCore/BreizhCoin",
    youtubeLink: "https://youtu.be/OqgS7SW_8tU",
    techStack: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "web",
  },
  {
    imageKey: "tboi",
    altTextKey: "categories_projects.tboi_image_alt",
    titleKey: "categories_projects.thebindingofisaac_title",
    descriptionKey: "categories_projects.thebindingofisaac_description",
    ghLink: "https://github.com/KizuCore/TheBindingOfIsaac",
    techStack: ["Java"],
    category: "game",
  },
  {
    imageKey: "portfolio",
    altTextKey: "categories_projects.portfolio_image_alt",
    titleKey: "categories_projects.portfolio_v1_title",
    descriptionKey: "categories_projects.portfolio_v1_description",
    ghLink: "https://github.com/KizuCore/Old-PortFolio",
    seeLink: "https://theo-guerin.netlify.app/",
    techStack: ["Vue.js", "JavaScript", "HTML", "CSS"],
    category: "web",
  },
];
