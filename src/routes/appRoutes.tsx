import { lazy, type JSX } from "react";
import { Navigate } from "react-router-dom";
import Home from "../components/Home/Home.tsx";
import { getLocalizedPath, SUPPORTED_LOCALES } from "../config/seo";

const About = lazy(() => import("../components/About/About.tsx"));
const Contact = lazy(() => import("../components/Contact/Contact.tsx"));
const Experience = lazy(() => import("../components/Experience/ExpTimeline.tsx"));
const Projects = lazy(() => import("../components/Projects/Projects.tsx"));
const CV = lazy(() => import("../components/Resume/CV.tsx"));
const Gojo = lazy(() => import("../components/Easter/Gojo.tsx"));
const RouteSecret = lazy(() => import("../components/Easter/Arcane.tsx"));
const MentionsLegales = lazy(() => import("../components/Legal/MentionsLegales.tsx"));
const PolitiqueConfidentialite = lazy(() => import("../components/Legal/PolitiqueConfidentialite.tsx"));
const PolitiqueCookies = lazy(() => import("../components/Legal/PolitiqueCookies.tsx"));

export type AppRoute = {
  path: string;
  element: JSX.Element;
};

export const APP_ROUTES: AppRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/project", element: <Projects /> },
  { path: "/about", element: <About /> },
  { path: "/experience", element: <Experience /> },
  { path: "/cv", element: <CV /> },
  { path: "/contact", element: <Contact /> },
  { path: "/mentions-legales", element: <MentionsLegales /> },
  { path: "/politique-de-confidentialite", element: <PolitiqueConfidentialite /> },
  { path: "/politique-des-cookies", element: <PolitiqueCookies /> },
  { path: "/gojo", element: <Gojo /> },
  { path: "/arcane", element: <RouteSecret /> },
];

const LOCALIZABLE_ROUTES = APP_ROUTES.filter((route) => !["/gojo", "/arcane"].includes(route.path));

export const LOCALIZED_APP_ROUTES: AppRoute[] = SUPPORTED_LOCALES.flatMap((locale) =>
  LOCALIZABLE_ROUTES.map((route) => ({
    path: getLocalizedPath(locale, route.path),
    element: route.element,
  }))
);

export const ALL_APP_ROUTES: AppRoute[] = [...APP_ROUTES, ...LOCALIZED_APP_ROUTES];

export const FALLBACK_ROUTE: AppRoute = {
  path: "*",
  element: <Navigate to="/" replace />,
};
