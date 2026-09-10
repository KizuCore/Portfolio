import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import PreloaderLogo from "../Layout/Preloader/PreloaderLogo";
import "../../assets/styles/Preloader/Preloader.css";
import "../../assets/styles/Home/HomeAnimatedLogo.css";

type Props = { onDragStateChange: (dragging: boolean) => void; onExposureChange: (exposed: boolean) => void };

// Seul le SVG se déplace : le trou noir reste ancré derrière lui dans la section d’accueil.
export default function HomeAnimatedLogo({ onDragStateChange, onExposureChange }: Props) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return <motion.div
    ref={ref}
    className="home-animated-logo"
    data-visible={inView}
    role="img"
    aria-label={t("theo_developer")}
    drag
    dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
    dragElastic={1}
    dragTransition={{ bounceStiffness: reduceMotion ? 1000 : 220, bounceDamping: reduceMotion ? 100 : 22 }}
    onDragStart={() => onDragStateChange(true)}
    onDrag={(_, info) => onExposureChange(Math.hypot(info.offset.x, info.offset.y) > 75)}
    onDragEnd={() => { onDragStateChange(false); onExposureChange(false); }}
    onPointerCancel={() => { onDragStateChange(false); onExposureChange(false); }}
  ><PreloaderLogo /></motion.div>;
}
