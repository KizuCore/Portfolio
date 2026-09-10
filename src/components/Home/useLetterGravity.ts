import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

type Letter = { element: HTMLElement; x: number; y: number; delay: number; spin: number };

export default function useLetterGravity(root: RefObject<HTMLElement>, active: boolean) {
  const reducedMotion = useReducedMotion();
  const progress = useRef(0);
  const letters = useRef<Letter[]>([]);

  useEffect(() => {
    const reset = () => {
      for (const { element } of letters.current) {
        element.style.removeProperty("transform");
        element.style.removeProperty("opacity");
      }
      letters.current = [];
      progress.current = 0;
    };
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion || motionPreference.matches) { reset(); return; }
    if (!active && progress.current === 0) return;

    const measure = () => {
      const hole = root.current?.querySelector(".event-horizon")?.getBoundingClientRect();
      if (!hole) return;
      const cx = hole.left + hole.width / 2, cy = hole.top + hole.height / 2;
      const nodes = Array.from(root.current?.querySelectorAll<HTMLElement>(".gravity-letter") ?? []);
      letters.current = nodes.map((element, index) => {
        const rect = element.getBoundingClientRect();
        const x = cx - rect.left - rect.width / 2, y = cy - rect.top - rect.height / 2;
        return { element, x, y, delay: Math.min(.38, Math.hypot(x, y) / 2500) + (index % 7) * .012, spin: index % 2 ? 1 : -1 };
      });
    };
    if (!letters.current.length) measure();
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (motionPreference.matches) { reset(); return; }
      const dt = document.hidden ? 0 : Math.min(now - last, 50) / 1000;
      last = now;
      progress.current = Math.max(0, Math.min(1, progress.current + dt * (active ? 1 / 7 : -1 / .9)));
      for (const { element, x, y, delay, spin } of letters.current) {
        const local = Math.max(0, Math.min(1, (progress.current - delay) / (1 - delay)));
        const pull = local * local * (3 - 2 * local);
        const swirl = Math.sin(local * Math.PI) * 35 * spin;
        element.style.transform = `translate(${x * pull - y / Math.max(1, Math.hypot(x, y)) * swirl}px, ${y * pull + x / Math.max(1, Math.hypot(x, y)) * swirl}px) rotate(${spin * pull * 220}deg) scale(${1 - pull * .96})`;
        element.style.opacity = String(1 - Math.max(0, (local - .65) / .35));
      }
      if (!active && progress.current === 0) { reset(); return; }
      if (active && progress.current === 1) return;
      frame = requestAnimationFrame(tick);
    };
    // Le redimensionnement change la destination ; rétablit l’état initial avant de mesurer la nouvelle disposition.
    const resize = () => { reset(); measure(); };
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [active, reducedMotion, root]);
}
