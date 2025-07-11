import React from "react";
import "../../assets/styles/Preloader/Preloader.css";

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
        <div className="preloader-glow" />
        <div className="preloader-ring" />
        <div className="preloader-logo" />
      </div>
    </div>
  );
};

export default Preloader;
