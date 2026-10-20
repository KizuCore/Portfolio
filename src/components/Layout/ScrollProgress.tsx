import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Le navigateur suit le défilement sans mesure de la page ni rendu React.
    if (CSS.supports("animation-timeline: scroll(root block)")) return;

    let rafId = 0;

    const getScrollableHeight = () => {
      const rootHeight = document.getElementById("root")?.scrollHeight ?? 0;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.scrollHeight,
        document.body.offsetHeight,
        rootHeight,
      );

      return Math.max(docHeight - window.innerHeight, 0);
    };

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      // Au sommet, la progression est connue sans forcer le calcul de la hauteur.
      if (scrollTop <= 0) {
        setProgress(0);
        return;
      }
      const scrollableHeight = getScrollableHeight();
      const nextProgress = scrollableHeight <= 0 ? 0 : Math.min(scrollTop / scrollableHeight, 1);
      setProgress((previous) => (previous === nextProgress ? previous : nextProgress));
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateProgress();
      });
    };

    const handleResize = () => {
      scheduleUpdate();
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(handleResize)
      : null;

    resizeObserver?.observe(document.body);
    resizeObserver?.observe(document.documentElement);
    // La première notification arrive après le calcul de la mise en page.
    if (!resizeObserver) scheduleUpdate();

    // ResizeObserver suit déjà la hauteur après une navigation ou le chargement d’une image.
    // Observer chaque attribut déclenchait une mesure à chaque image des animations.

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      aria-hidden="true"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

export default ScrollProgress;
