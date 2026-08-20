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
import {
  PORTFOLIO_PROJECTS,
  PROJECT_FILTERS,
  type PortfolioProject,
  type ProjectCategory,
  type ProjectFilter,
} from "@/data/portfolio";

export type ProjectItem = {
  imgPath: string;
} & Omit<PortfolioProject, "imageKey">;

const PROJECT_IMAGES: Record<PortfolioProject["imageKey"], string> = {
  aTable,
  apibook,
  badmintonapi,
  breizhcoin,
  chrono,
  cosmiclink,
  flambow,
  flambowFrontend,
  lemonmaze,
  portesDeMontafilan,
  portfolio,
  portfoliov2,
  tboi,
};

export type { ProjectCategory, ProjectFilter };

export { PROJECT_FILTERS };

export const PROJECTS: ProjectItem[] = PORTFOLIO_PROJECTS.map(({ imageKey, ...project }) => ({
  ...project,
  imgPath: PROJECT_IMAGES[imageKey],
}));

export const PROJECT_IMAGE_SOURCES = Array.from(new Set(PROJECTS.map((project) => project.imgPath)));
