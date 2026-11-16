import { useRef, useState } from "react";
import useLetterGravity from "./useLetterGravity";
import useHomeMotion from "./useHomeMotion";
import HomeOffer from "./HomeOffer";
import HomeAnimatedLogo from "./HomeAnimatedLogo";
import HomeProof from "./HomeProof";
import HomeStats from "./HomeStats";
import Services from "./Services";
import "../../assets/styles/Home/Home.css";
import "../../assets/styles/Home/HomeMotion.css";

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
