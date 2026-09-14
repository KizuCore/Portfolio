import lemonmazeThumb from "@image/Projects/thumbnails/LemonMaze.webp";
import cosmiclinkThumb from "@image/Projects/thumbnails/CosmicLink.webp";
import chronoThumb from "@image/Projects/thumbnails/chrono.webp";
import aTableThumb from "@image/Projects/thumbnails/aTable.webp";
import tboiThumb from "@image/Projects/thumbnails/TBOI.webp";
import breizhcoinThumb from "@image/Projects/thumbnails/breizhcoin.webp";
import portfolioThumb from "@image/Projects/thumbnails/portfolio.webp";
import portfoliov2Thumb from "@image/Projects/thumbnails/portfoliov2.webp";
import apibookThumb from "@image/Projects/thumbnails/apibook.webp";
import flambowThumb from "@image/Projects/thumbnails/flambowImg.webp";
import flambowFrontendThumb from "@image/Projects/thumbnails/FlambowFrontEnd.webp";
import badmintonapiThumb from "@image/Projects/thumbnails/badmintonapi.webp";
import portesDeMontafilanThumb from "@image/Projects/thumbnails/portesDeMontafilan.webp";
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
  thumbnailPath: string;
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

const PROJECT_THUMBNAILS: Record<PortfolioProject["imageKey"], string> = {
  lemonmaze: lemonmazeThumb,
  cosmiclink: cosmiclinkThumb,
  chrono: chronoThumb,
  aTable: aTableThumb,
  tboi: tboiThumb,
  breizhcoin: breizhcoinThumb,
  portfolio: portfolioThumb,
  portfoliov2: portfoliov2Thumb,
  apibook: apibookThumb,
  flambow: flambowThumb,
  flambowFrontend: flambowFrontendThumb,
  badmintonapi: badmintonapiThumb,
  portesDeMontafilan: portesDeMontafilanThumb,
};

export type { ProjectCategory, ProjectFilter };

export { PROJECT_FILTERS };

export const PROJECTS: ProjectItem[] = PORTFOLIO_PROJECTS.map(({ imageKey, ...project }) => ({
  ...project,
  imgPath: PROJECT_IMAGES[imageKey],
  thumbnailPath: PROJECT_THUMBNAILS[imageKey],
}));
