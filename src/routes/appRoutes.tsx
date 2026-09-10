import { lazy, type JSX } from "react";
import LocaleFallbackRoute from "./LocaleFallbackRoute";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Resume from "../components/Resume/Resume";
import Experience from "../components/Experience/ExperienceTimeline";
import Projects from "../components/Projects/Projects";
import BusinessPage from "../components/Business/BusinessPage";
import { BUSINESS_PAGES } from "../data/businessPages";
import MentionsLegales from "../components/Legal/MentionsLegales";
import PolitiqueConfidentialite from "../components/Legal/PolitiqueConfidentialite";
import PolitiqueCookies from "../components/Legal/PolitiqueCookies";
import { getLocalizedPath, SUPPORTED_LOCALES } from "../config/seo";

// Charge immédiatement les pages publiques pour éviter le passage d’un squelette au contenu lors d’un accès direct.
const Gojo = lazy(() => import("../components/Easter/Gojo"));
const RouteSecret = lazy(() => import("../components/Easter/Arcane"));

export type AppRoute = {
  path: string;
  element: JSX.Element;
};

export const APP_ROUTES: AppRoute[] = [
  ...BUSINESS_PAGES.map((page) => ({ path: page.path, element: <BusinessPage page={page} /> })),
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
