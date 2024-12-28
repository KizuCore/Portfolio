import React, { useState, useEffect, Suspense, lazy } from "react";
import Preloader from "./components/Utils/Pre";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/Utils/ScrollToTop";
import "@style/style.css";
import "@style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SeoMeta from "./components/Helmet/react-helmet-seo";
import useKonamiCode from "./components/Utils/Konami";
import VideoPopup from "./components/Easter/Video";
import NavBar from "./components/Header/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Pre from "./components/Utils/Pre";

// Lazy load des composants de page
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const CV = lazy(() => import("./components/Resume/CV"));
const Gojo = lazy(() => import("./components/Easter/Gojo"));
const RouteSecret = lazy(() => import("./components/Easter/Route"));

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

  return (
    <Router>
      {showPreloader && <Preloader load={load} className={load ? "" : "fade-out"} />} {/* Affichage conditionnel Preloader */}
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <SeoMeta />
        <NavBar />
        <ScrollToTop />
        <KonamiComponent />
        <VideoPopup />
        <Suspense fallback={<Pre />}>
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
