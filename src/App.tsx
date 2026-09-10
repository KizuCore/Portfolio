import { useEffect, useLayoutEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./assets/styles/global.css";
import "./assets/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/Header/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SeoMeta from "@/components/Seo/SeoMeta";
import CookieBanner from "@/components/Legal/CookieBanner";
import CookiePreferencesModal from "@/components/Legal/CookiePreferencesModal";
import BackToTop from "@/components/Layout/BackToTop";
import ParticleBackground from "@/components/Layout/ParticleBackground";
import RouteSkeleton from "@/components/Layout/RouteSkeleton";
import ScrollProgress from "@/components/Layout/ScrollProgress";
import ScrollToTop from "@/components/Layout/ScrollToTop";
import { DEFAULT_LOCALE, getShortLocale, splitLocalizedPath } from "@/config/seo";
import useKonamiCode from "@/hooks/useKonamiCode";
import { ALL_APP_ROUTES, FALLBACK_ROUTE } from "@/routes/appRoutes";

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
  const routeInitial = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 12 };
  const routeAnimate = { opacity: 1, y: 0 };
  const routeExit = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: -8 };
  const routeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const };

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
              <motion.div
                key={location.pathname}
                className="route-stage"
                initial={routeInitial}
                animate={routeAnimate}
                exit={routeExit}
                transition={routeTransition}
              >
                <Routes location={location}>
                  {[...ALL_APP_ROUTES, FALLBACK_ROUTE].map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                </Routes>
              </motion.div>
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
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
