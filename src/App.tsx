import { useState, useEffect, Suspense } from "react";
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
import Preloader from "@/components/Layout/Preloader/Preloader";
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

type AppContentProps = {
  load: boolean;
  showPreloader: boolean;
};

function AppContent({ load, showPreloader }: AppContentProps) {
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

  // Keep route transitions subtle, and disable movement for users who reduce motion.
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
      {showPreloader && <Preloader load={load} className={load ? "" : "fade-out"} />}

      <div className="App" id={load ? "no-scroll" : "scroll"}>
        {/* Keep one particle engine alive while users navigate between routes. */}
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
              {/* Keying by pathname gives each page its own enter/exit animation. */}
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
  const [load, updateLoad] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Keep the preloader mounted briefly after fade-out so the opacity transition can finish.
    let unmountTimer: ReturnType<typeof setTimeout> | undefined;
    const loadingTimer = setTimeout(() => {
      updateLoad(false);
      unmountTimer = setTimeout(() => setShowPreloader(false), 500);
    }, 2900);

    return () => {
      clearTimeout(loadingTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <Router>
      <AppContent load={load} showPreloader={showPreloader} />
    </Router>
  );
}

export default App;
