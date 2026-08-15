import { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./assets/styles/style.css";
import "./assets/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Header/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import SeoMeta from "./components/Helmet/react-helmet-seo.tsx";
import CookieBanner from "./components/Legal/CookieBanner.tsx";
import CookiePreferencesModal from "./components/Legal/CookiePreferencesModal.tsx";
import Preloader from "./utils/Preloader.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";
import ScrollProgress from "./utils/ScrollProgress.tsx";
import BackToTop from "./utils/BackToTop.tsx";
import RouteSkeleton from "./utils/RouteSkeleton.tsx";
import useKonamiCode from "./utils/Konami.tsx";
import { APP_ROUTES, FALLBACK_ROUTE } from "./routes/appRoutes.tsx";

function KonamiComponent() {
  useKonamiCode();
  return null;
}

type AppContentProps = {
  load: boolean;
  showPreloader: boolean;
};

function AppContent({ load, showPreloader }: AppContentProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

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
        <SeoMeta />
        <NavBar />
        <ScrollToTop />
        <KonamiComponent />

        <main className="main-content" id="main-content" tabIndex={-1}>
          <CookieBanner />
          <CookiePreferencesModal />

          <Suspense fallback={<RouteSkeleton />}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                className="route-stage"
                initial={routeInitial}
                animate={routeAnimate}
                exit={routeExit}
                transition={routeTransition}
              >
                <Routes location={location}>
                  {[...APP_ROUTES, FALLBACK_ROUTE].map((route) => (
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
    const timer = setTimeout(() => {
      updateLoad(false);
      setTimeout(() => setShowPreloader(false), 500);
    }, 2900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AppContent load={load} showPreloader={showPreloader} />
    </Router>
  );
}

export default App;
