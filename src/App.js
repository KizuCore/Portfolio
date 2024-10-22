import React, { useState, useEffect } from "react";
import Preloader from "./components/Utils/Pre";
import Navbar from "./components/Header/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import CV from "./components/Resume/CV";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/Utils/ScrollToTop"; 
import "./Assets/style/style.css";
import "./Assets/style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SeoMeta from "./components/Helmet/react-helmet-seo";
import Gojo from "./components/Gojo/Gojo";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <SeoMeta />
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/gojo" element={<Gojo />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
