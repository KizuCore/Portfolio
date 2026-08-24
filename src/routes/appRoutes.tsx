import { lazy, type JSX } from "react";
import { Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Resume from "../components/Resume/Resume";
import Experience from "../components/Experience/ExperienceTimeline";
import Projects from "../components/Projects/Projects";
import MentionsLegales from "../components/Legal/MentionsLegales";
import PolitiqueConfidentialite from "../components/Legal/PolitiqueConfidentialite";
import PolitiqueCookies from "../components/Legal/PolitiqueCookies";
import { getLocalizedPath, SUPPORTED_LOCALES } from "../config/seo";

// Public routes are eager so direct visits do not shift from a skeleton into the final page.
const Gojo = lazy(() => import("../components/Easter/Gojo"));
const RouteSecret = lazy(() => import("../components/Easter/Arcane"));

export type AppRoute = {
  path: string;
  element: JSX.Element;
};

export const APP_ROUTES: AppRoute[] = [
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

// Secret pages stay language-neutral because they are reached through hidden interactions.
const LOCALIZABLE_ROUTES = APP_ROUTES.filter((route) => !["/gojo", "/arcane"].includes(route.path));

// Localized route entries reuse the same components; SEO helpers decide the visible URL.
export const LOCALIZED_APP_ROUTES: AppRoute[] = SUPPORTED_LOCALES.flatMap((locale) =>
  LOCALIZABLE_ROUTES.map((route) => ({
    path: getLocalizedPath(locale, route.path),
    element: route.element,
  }))
);

export const ALL_APP_ROUTES: AppRoute[] = [...APP_ROUTES, ...LOCALIZED_APP_ROUTES];

export const FALLBACK_ROUTE: AppRoute = {
  path: "*",
  element: <Navigate to="/fr" replace />,
};
