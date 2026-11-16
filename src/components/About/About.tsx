import { JSX, lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import GitHubActivity from "./GitHubActivity";
import TechStack from "./TechnologyStack";
import AboutCard from "./AboutCard";
import ToolStack from "./DevelopmentTools";
import { useInView } from 'react-intersection-observer';
import '../../assets/styles/About/About.css';
import "../../assets/styles/About/SolarSystem.css";
import "../../assets/styles/About/AboutIntro.css";
import "../../assets/styles/About/AboutSkills.css";

const SolarSystem = lazy(() => import("./SolarSystem"));

// Réserve exactement les mêmes surfaces avant le chargement de l'animation.
const solarPlaceholder = (
  <div className="solar-container" aria-hidden="true">
    <div className="solar-stage" />
    <div className="solar-controls"><p /></div>
  </div>
);

function About(): JSX.Element {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== "#about-skills-title") return;
    // Attend le montage de cette route chargée à la demande avant de suivre le lien des compétences du CV.
    const frame = requestAnimationFrame(() => {
      const heading = document.getElementById("about-skills-title");
      heading?.scrollIntoView({ block: "start", behavior: "instant" });
      heading?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  const { ref: refImg, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "200px 0px",
  });



  return (
    <div className="about-section about-page site-page">
      <div className="page-content site-container">
        <div className="about-intro grid grid-cols-1 items-start gap-x-6 min-[992px]:grid-cols-12">

          <header className="about-page-heading min-[992px]:col-span-12">
          <p className="page-eyebrow">{t('page_headers.about')}</p>
          <h1 className="about-intro-title page-title">
            {t('about_me')}
          </h1>
          </header>

          <div className="about-intro-copy min-[992px]:col-span-7">
            <AboutCard />
          </div>

          <div className="about-img flex items-center justify-center min-[992px]:col-span-5" ref={refImg}>

            <motion.div
              className="canvas-container"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={imgInView ? { opacity: 1 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
            >
              {imgInView ? (
                <Suspense fallback={solarPlaceholder}><SolarSystem /></Suspense>
              ) : solarPlaceholder}
            </motion.div>

          </div>
        </div>

        <section className="about-skills-section" aria-labelledby="about-skills-title">
        <h2
          id="about-skills-title"
          tabIndex={-1}
          className="about-section-title"
        >
          {t('professional_skills')} {t('skills')}
        </h2>
        <TechStack />
        </section>
        <ToolStack />
        <GitHubActivity />
      </div>
    </div>
  );
}

export default About;
