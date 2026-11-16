import React from "react";

interface PreloaderProps {
  load?: boolean;
  className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ load = true, className = "" }) => {
  // Les styles critiques d’index.html affichent le même chat fixe avant le démarrage de React.
  return (
    <div
      className={`startup-loader ${className} ${load ? "" : "loaded"}`}
      aria-hidden="true"
    />
  );
};

export default Preloader;
