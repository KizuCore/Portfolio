import React from "react";
import { useTranslation } from "react-i18next";
import "../assets/styles/Preloader/Preloader.css";
import LogoSVG from "./LogoSVG";

interface PreloaderProps {
  load?: boolean;
  className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ load = true, className = "" }) => {
  const { t } = useTranslation();

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
          <span className="preloader-wordmark-sub">{t("preloader_subtitle")}</span>
        </p>
      </div>
    </div>
  );
};

export default Preloader;
