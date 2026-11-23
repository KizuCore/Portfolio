import { useEffect, useRef, type PointerEvent } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import PreloaderLogo from "@/shared/ui/PreloaderLogo";
import "@/shared/ui/styles/Preloader.css";
import "../styles/HomeAnimatedLogo.css";

type Props = { onDragStateChange: (dragging: boolean) => void; onExposureChange: (exposed: boolean) => void };

// Seul le SVG se déplace : le trou noir reste ancré derrière lui dans la section d’accueil.
export default function HomeAnimatedLogo({ onDragStateChange, onExposureChange }: Props) {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const returnAnimation = useRef<Animation | null>(null);
  useEffect(() => () => returnAnimation.current?.cancel(), []);

  const release = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    const element = event.currentTarget;
    const { m41: x, m42: y } = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    drag.current = null;
    element.removeAttribute("data-dragging");
    element.style.transform = "translate3d(0, 0, 0)";
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    onExposureChange(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.hypot(x, y) < 1) {
      onDragStateChange(false);
      return;
    }

    // Un élan vers l'extérieur, puis des rebonds amortis sur deux axes indépendants.
    // Les images échantillonnées gardent une trajectoire fluide entre les oscillations.
    const frames = Array.from({ length: 121 }, (_, index) => {
      const time = index / 120 * 2;
      const decay = Math.exp(-3.8 * time);
      const horizontal = decay * (Math.cos(9 * time) + 0.6 * Math.sin(9 * time));
      const vertical = decay * (Math.cos(11 * time) + 0.5 * Math.sin(11 * time));
      const dx = index === 120 ? 0 : x * horizontal;
      const dy = index === 120 ? 0 : y * vertical;
      return { transform: `translate3d(${dx}px, ${dy}px, 0)` };
    });
    const animation = element.animate(frames, { duration: 2000, easing: "linear" });
    returnAnimation.current = animation;
    // Le halo fixe reste masqué jusqu'à la fin des rebonds, une fois le logo revenu au centre.
    animation.onfinish = () => {
      returnAnimation.current = null;
      onDragStateChange(false);
    };
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
      returnAnimation.current?.cancel();
      returnAnimation.current = null;
      event.currentTarget.style.transform = `translate3d(${transform.m41}px, ${transform.m42}px, 0)`;
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
