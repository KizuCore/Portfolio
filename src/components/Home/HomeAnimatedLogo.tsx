import { useRef, type PointerEvent } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import PreloaderLogo from "../Layout/Preloader/PreloaderLogo";
import "../../assets/styles/Preloader/Preloader.css";
import "../../assets/styles/Home/HomeAnimatedLogo.css";

type Props = { onDragStateChange: (dragging: boolean) => void; onExposureChange: (exposed: boolean) => void };

// Seul le SVG se déplace : le trou noir reste ancré derrière lui dans la section d’accueil.
export default function HomeAnimatedLogo({ onDragStateChange, onExposureChange }: Props) {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const release = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.removeAttribute("data-dragging");
    event.currentTarget.style.transform = "translate3d(0, 0, 0)";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    onDragStateChange(false);
    onExposureChange(false);
  };

  return <div
    ref={ref}
    className="home-animated-logo"
    data-visible={inView}
    role="img"
    aria-label={t("theo_developer")}
    onPointerDown={(event) => {
      if (!event.isPrimary || event.button !== 0 || drag.current) return;
      // Mesure uniquement lors d'une interaction, pour reprendre un retour en cours.
      const transform = new DOMMatrixReadOnly(getComputedStyle(event.currentTarget).transform);
      drag.current = { id: event.pointerId, x: event.clientX - transform.m41, y: event.clientY - transform.m42 };
      event.currentTarget.dataset.dragging = "true";
      event.currentTarget.setPointerCapture(event.pointerId);
      onDragStateChange(true);
    }}
    onPointerMove={(event) => {
      if (drag.current?.id !== event.pointerId) return;
      const x = event.clientX - drag.current.x;
      const y = event.clientY - drag.current.y;
      event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      onExposureChange(Math.hypot(x, y) > 75);
    }}
    onPointerUp={release}
    onPointerCancel={release}
    onLostPointerCapture={release}
  ><PreloaderLogo /></div>;
}
