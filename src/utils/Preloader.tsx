import React from "react";
import "../assets/styles/Preloader/Preloader.css";
import LogoSVG from "./LogoSVG";

interface PreloaderProps {
  load?: boolean;
  className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ load = true, className = "" }) => {
  return (
    <div
      id="preloader"
      className={`preloader ${className} ${load ? "" : "loaded"}`}
      aria-hidden="true"
    >
      <div className="preloader-content">
        <LogoSVG />
        <p className="preloader-wordmark" aria-label="KizuCore">
          <span className="preloader-wordmark-main">KizuCore</span>
          <span className="preloader-wordmark-sub">Full-Stack Web Developer</span>
        </p>
      </div>
    </div>
  );
};

export default Preloader;
