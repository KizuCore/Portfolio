import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./assets/styles/style.css";
import "./assets/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoPopup from "./components/Easter/Video.tsx";
import NavBar from "./components/Header/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import SeoMeta from "./components/Helmet/react-helmet-seo.tsx";
import MentionsLegales from "./components/Legal/MentionsLegales.tsx";
import PolitiqueConfidentialite from "./components/Legal/PolitiqueConfidentialite.tsx";
import CookieBanner from "./components/Legal/CookieBanner.tsx";
import CookiePreferencesModal from "./components/Legal/CookiePreferencesModal.tsx";
import Preloader from "./utils/Preloader.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";
import ScrollProgress from "./utils/ScrollProgress.tsx";
import BackToTop from "./utils/BackToTop.tsx";
import useKonamiCode from "./utils/Konami.tsx";

// Lazy load des composants de page
const Home = lazy(() => import("./components/Home/Home.tsx"));
const About = lazy(() => import("./components/About/About.tsx"));
const Contact = lazy(() => import("./components/Contact/Contact.tsx"));
const Experience = lazy(() => import("./components/Experience/ExpTimeline.tsx"));
const Projects = lazy(() => import("./components/Projects/Projects.tsx"));
const CV = lazy(() => import("./components/Resume/CV.tsx"));
const Gojo = lazy(() => import("./components/Easter/Gojo.tsx"));
const RouteSecret = lazy(() => import("./components/Easter/Arcane.tsx"));

// Code Konami
function KonamiComponent() {
  useKonamiCode();
  return null;
}

function App() {
  const { t } = useTranslation();
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
      <a className="skip-link" href="#main-content">
        {t("a11y.skip_to_content", { defaultValue: "Aller au contenu" })}
      </a>
      <ScrollProgress />
      {showPreloader && <Preloader load={load} className={load ? "" : "fade-out"} />} {/* Affichage conditionnel Preloader */}
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <SeoMeta />
        <NavBar />
        <ScrollToTop />
        <KonamiComponent />
        <VideoPopup />
        <main className="main-content" id="main-content" tabIndex={-1}>
          <Suspense fallback={<Preloader />}>
            {/* Bannière consent sur toutes les pages */}
            <CookieBanner />
            <CookiePreferencesModal />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/gojo" element={<Gojo />} />
              <Route path="/arcane" element={<RouteSecret />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
