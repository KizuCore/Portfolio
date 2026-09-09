import { useRef, useState } from "react";
import useLetterGravity from "./useLetterGravity";
import HomeOffer from "./HomeOffer";
import HomeAnimatedLogo from "./HomeAnimatedLogo";
import HomeProof from "./HomeProof";
import HomeStats from "./HomeStats";
import Services from "./Services";
import "../../assets/styles/Home/Home.css";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [isExposed, setIsExposed] = useState(false);
  const hero = useRef<HTMLElement>(null);
  useLetterGravity(hero, isExposed);
  return <section ref={hero}>
    <div className="container-fluid about-section pt-0" id="home">
      <div className="container home-content">
        <div className="row align-items-center justify-content-center text-center text-md-left padtopbot">
          <div className="col-12 col-md-6 home-header py-md-5"><HomeOffer /></div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center py-4">
            <div className={`logo-wrapper home-logo-orbit mt-3 mt-md-0${isDragging ? " dragging" : ""}`}>
              <div className="black-hole" aria-hidden="true">
                <div className="black-hole-aura" />
                <div className="black-hole-lensing" />
                <div className="accretion-disk"><div className="accretion-flow" /></div>
                <div className="event-horizon" />
                <div className="accretion-disk accretion-foreground"><div className="accretion-flow" /></div>
                <div className="black-hole-photon-ring" />
              </div>
              <HomeAnimatedLogo onDragStateChange={setIsDragging} onExposureChange={setIsExposed} />
            </div>
          </div>
          <HomeStats />
        </div>
        <HomeProof />
        <Services />
      </div>
    </div>
  </section>;
}
