import { lazy, type JSX } from "react";
import Home from "@/features/home/pages/Home";
import { BUSINESS_PAGES } from "@/content/businessPages";
import { getLocalizedPath, SUPPORTED_LOCALES } from "@/shared/config/seo";

// L’accueil reste immédiat ; les autres pages chargent leur code et leurs styles à la navigation.
const About = lazy(() => import("@/features/about/pages/About"));
const Contact = lazy(() => import("@/features/contact/pages/Contact"));
const Resume = lazy(() => import("@/features/resume/pages/Resume"));
const Experience = lazy(() => import("@/features/experience/pages/ExperienceTimeline"));
const Projects = lazy(() => import("@/features/projects/pages/Projects"));
const BusinessPage = lazy(() => import("@/features/business/pages/BusinessPage"));
const LaMareeMalouine = lazy(() => import("@/features/case-studies/pages/LaMareeMalouine"));
const LesPortesDeMontafilan = lazy(() => import("@/features/case-studies/pages/LesPortesDeMontafilan"));
const ATable = lazy(() => import("@/features/case-studies/pages/ATable"));
const MentionsLegales = lazy(() => import("@/features/legal/pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("@/features/legal/pages/PolitiqueConfidentialite"));
const PolitiqueCookies = lazy(() => import("@/features/legal/pages/PolitiqueCookies"));
const Gojo = lazy(() => import("@/features/easter-eggs/pages/Gojo"));
const RouteSecret = lazy(() => import("@/features/easter-eggs/pages/Arcane"));
const LocaleFallbackRoute = lazy(() => import("@/features/not-found/pages/NotFound"));

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
