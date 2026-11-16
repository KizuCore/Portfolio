import { useEffect, useLayoutEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/styles/global.css";
import "./styles/App.css";
import "./styles/PagePresentation.css";
import NavBar from "./layout/header/Navbar/Navbar";
import Footer from "./layout/footer/Footer";
import SeoMeta from "./seo/SeoMeta";
import CookieBanner from "@/shared/privacy/components/CookieBanner";
import CookiePreferencesModal from "@/shared/privacy/components/CookiePreferencesModal";
import BackToTop from "./layout/BackToTop";
import ParticleBackground from "./layout/ParticleBackground";
import RouteSkeleton from "./layout/RouteSkeleton";
import PageMotion from "./layout/PageMotion";
import ScrollProgress from "./layout/ScrollProgress";
import ScrollToTop from "./layout/ScrollToTop";
import { DEFAULT_LOCALE, getShortLocale, splitLocalizedPath } from "@/shared/config/seo";
import useKonamiCode from "@/features/easter-eggs/hooks/useKonamiCode";
import { ALL_APP_ROUTES, FALLBACK_ROUTE } from "./routes/appRoutes";

function KonamiComponent() {
  useKonamiCode();
  return null;
}

function AppContent() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const routeLocale = splitLocalizedPath(location.pathname).locale;

  useEffect(() => {
    if (!routeLocale) {
      return;
    }

    const currentLocale = getShortLocale(i18n.resolvedLanguage ?? i18n.language ?? DEFAULT_LOCALE);
    if (currentLocale !== routeLocale) {
      void i18n.changeLanguage(routeLocale);
    }
  }, [i18n, routeLocale]);

  // Garde les transitions entre pages discrètes et désactive les mouvements selon les préférences d’accessibilité.
  const routeInitial = reduceMotion ? { opacity: 1 } : { opacity: 0 };
  const routeAnimate = { opacity: 1 };
  const routeExit = { opacity: reduceMotion ? 1 : 0 };
  const routeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("a11y.skip_to_content")}
      </a>
      <ScrollProgress />

      <div className="App" id="scroll">
        {/* Conserve un seul moteur de particules pendant la navigation entre les pages. */}
        <ParticleBackground />
        <SeoMeta />
        <NavBar />
        <ScrollToTop />
        <KonamiComponent />

        <main className="main-content" id="main-content" tabIndex={-1}>
          <CookieBanner />
          <CookiePreferencesModal />

          <Suspense fallback={<RouteSkeleton />}>
            <AnimatePresence mode="wait" initial={false}>
              {/* La clé fondée sur pathname donne à chaque page sa propre animation d’entrée et de sortie. */}
              <m.div
                key={location.pathname}
                className="route-stage"
                initial={routeInitial}
                animate={routeAnimate}
                exit={routeExit}
                transition={routeTransition}
              >
                <PageMotion><Routes location={location}>
                  {[...ALL_APP_ROUTES, FALLBACK_ROUTE].map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                </Routes></PageMotion>
              </m.div>
            </AnimatePresence>
          </Suspense>
        </main>

        <BackToTop />
        <Footer />
      </div>
    </>
  );
}

function App() {
  useLayoutEffect(() => {
    // Affiche l’application seulement après le premier rendu effectif de React.
    document.documentElement.removeAttribute("data-app-loading");
  }, []);

  // Affiche le contenu immédiatement : l’animation de chargement ne doit pas retarder l’accès au portfolio.
  return (
    <LazyMotion features={domAnimation}>
      <Router>
        <AppContent />
      </Router>
    </LazyMotion>
  );
}

export default App;
