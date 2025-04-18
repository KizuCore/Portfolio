import { useState, useEffect, Suspense, lazy } from "react";
import Preloader from "./components/Utils/Preloader.tsx";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import ScrollToTop from "./components/Utils/ScrollToTop.tsx";
import "./assets/styles/style.css";
import "./assets/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useKonamiCode from "./components/Utils/Konami.tsx";
import VideoPopup from "./components/Easter/Video.tsx";
import NavBar from "./components/Header/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import SeoMeta from "./components/Helmet/react-helmet-seo.tsx";

// Lazy load des composants de page
const Home = lazy(() => import("./components/Home/Home.tsx"));
const About = lazy(() => import("./components/About/About.tsx"));
const Projects = lazy(() => import("./components/Projects/Projects.tsx"));
const CV = lazy(() => import("./components/Resume/CV.tsx"));
const Gojo = lazy(() => import("./components/Easter/Gojo.tsx"));
const RouteSecret = lazy(() => import("./components/Easter/Route.tsx"));

// Code Konami
function KonamiComponent() {
  useKonamiCode();
  return null;
}

function App() {
  const [load, updateLoad] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
      setTimeout(() => setShowPreloader(false), 500); 
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
  }, []);
  

  

  return (
    <Router>
      {showPreloader && <Preloader load={load} className={load ? "" : "fade-out"} />} {/* Affichage conditionnel Preloader */}
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <SeoMeta />
        <NavBar />
        <ScrollToTop />
        <KonamiComponent />
        <VideoPopup />
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/gojo" element={<Gojo />} />
            <Route path="/arcane" element={<RouteSecret />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
