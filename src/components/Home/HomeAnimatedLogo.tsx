import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import PreloaderLogo from "../Layout/Preloader/PreloaderLogo";
import "../../assets/styles/Preloader/Preloader.css";
import "../../assets/styles/Home/HomeAnimatedLogo.css";

type Props = { onDragStateChange: (dragging: boolean) => void };

// Only the SVG moves: the black hole stays anchored behind it in the hero.
export default function HomeAnimatedLogo({ onDragStateChange }: Props) {
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
    onDragEnd={() => onDragStateChange(false)}
  ><PreloaderLogo /></motion.div>;
}
