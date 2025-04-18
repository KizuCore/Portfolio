import React from "react";
import "../../assets/styles/Preloader/Preloader.css";

interface PreloaderProps {
  load?: boolean;
  className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ load, className = "" }) => {
  return (
    <div
      id="preloader"
      className={`preloader ${className} ${load ? "loading" : "loaded"}`}
      aria-hidden="true"
    ></div>
  );
};

export default Preloader;
