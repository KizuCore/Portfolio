import { useRef, useState } from "react";
import useLetterGravity from "../hooks/useLetterGravity";
import useHomeMotion from "../hooks/useHomeMotion";
import HomeOffer from "../components/HomeOffer";
import HomeAnimatedLogo from "../components/HomeAnimatedLogo";
import HomeProof from "../components/HomeProof";
import HomeStats from "../components/HomeStats";
import Services from "../components/Services";
import "../styles/Home.css";
import "../styles/HomeMotion.css";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [isExposed, setIsExposed] = useState(false);
  const [gravityReady, setGravityReady] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const page = useRef<HTMLDivElement>(null);
  useLetterGravity(hero, isExposed);
  useHomeMotion(page);
  return <div className="home-page" id="home" ref={page}>
      <div className="home-content site-container">
        <section className="home-hero" ref={hero}>
          <div className="home-header"><HomeOffer gravityReady={gravityReady} /></div>
          <div className="home-sky-illustration">
            <div className="home-nebula" aria-hidden="true" />
            <div className={`logo-wrapper home-logo-orbit${isDragging ? " dragging" : ""}`}>
              <div className="black-hole" aria-hidden="true">
                <div className="black-hole-aura" />
                <div className="black-hole-lensing" />
                <div className="accretion-disk"><div className="accretion-flow" /></div>
                <div className="event-horizon" />
                <div className="accretion-disk accretion-foreground"><div className="accretion-flow" /></div>
                <div className="black-hole-photon-ring" />
              </div>
              <HomeAnimatedLogo onDragStateChange={(dragging) => {
                setIsDragging(dragging);
                if (dragging) setGravityReady(true);
              }} onExposureChange={setIsExposed} />
            </div>
          </div>
        </section>
        <HomeStats />
        <HomeProof />
        <Services />
      </div>
  </div>;
}
