import { lazy, type JSX } from "react";
import LocaleFallbackRoute from "./LocaleFallbackRoute";
import Home from "../components/Home/Home";
import { BUSINESS_PAGES } from "../data/businessPages";
import { getLocalizedPath, SUPPORTED_LOCALES } from "../config/seo";

// L’accueil reste immédiat ; les autres pages chargent leur code et leurs styles à la navigation.
const About = lazy(() => import("../components/About/About"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Resume = lazy(() => import("../components/Resume/Resume"));
const Experience = lazy(() => import("../components/Experience/ExperienceTimeline"));
const Projects = lazy(() => import("../components/Projects/Projects"));
const BusinessPage = lazy(() => import("../components/Business/BusinessPage"));
const LaMareeMalouine = lazy(() => import("../components/CaseStudies/LaMareeMalouine"));
const LesPortesDeMontafilan = lazy(() => import("../components/CaseStudies/LesPortesDeMontafilan"));
const ATable = lazy(() => import("../components/CaseStudies/ATable"));
const MentionsLegales = lazy(() => import("../components/Legal/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("../components/Legal/PolitiqueConfidentialite"));
const PolitiqueCookies = lazy(() => import("../components/Legal/PolitiqueCookies"));
const Gojo = lazy(() => import("../components/Easter/Gojo"));
const RouteSecret = lazy(() => import("../components/Easter/Arcane"));

export type AppRoute = {
  path: string;
  element: JSX.Element;
};

export const APP_ROUTES: AppRoute[] = [
  ...BUSINESS_PAGES.filter((page) => page.kind === "service").map((page) => ({ path: page.path, element: <BusinessPage page={page} /> })),
  { path: "/realisations/la-maree-malouine", element: <LaMareeMalouine /> },
  { path: "/realisations/les-portes-de-montafilan", element: <LesPortesDeMontafilan /> },
  { path: "/realisations/a-table", element: <ATable /> },
  { path: "/", element: <Home /> },
  { path: "/project", element: <Projects /> },
  { path: "/about", element: <About /> },
  { path: "/experience", element: <Experience /> },
  { path: "/cv", element: <Resume /> },
  { path: "/contact", element: <Contact /> },
  { path: "/mentions-legales", element: <MentionsLegales /> },
  { path: "/politique-de-confidentialite", element: <PolitiqueConfidentialite /> },
  { path: "/politique-des-cookies", element: <PolitiqueCookies /> },
  { path: "/gojo", element: <Gojo /> },
  { path: "/arcane", element: <RouteSecret /> },
];

// Les pages secrètes restent indépendantes de la langue, car elles sont accessibles par des interactions cachées.
const LOCALIZABLE_ROUTES = APP_ROUTES.filter((route) => !["/gojo", "/arcane"].includes(route.path));

// Les routes traduites réutilisent les mêmes composants ; les fonctions SEO déterminent l’URL visible.
export const LOCALIZED_APP_ROUTES: AppRoute[] = SUPPORTED_LOCALES.flatMap((locale) =>
  LOCALIZABLE_ROUTES.map((route) => ({
    path: getLocalizedPath(locale, route.path),
    element: route.element,
  }))
);

export const ALL_APP_ROUTES: AppRoute[] = [...APP_ROUTES, ...LOCALIZED_APP_ROUTES];

export const FALLBACK_ROUTE: AppRoute = {
  path: "*",
  element: <LocaleFallbackRoute />,
};
