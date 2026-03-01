import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let scrollableHeight = 0;

    const refreshScrollableHeight = () => {
      scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    };

    const updateProgress = () => {
      const scrollTop = window.scrollY;
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
      refreshScrollableHeight();
      scheduleUpdate();
    };

    refreshScrollableHeight();
    updateProgress();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(handleResize)
      : null;

    resizeObserver?.observe(document.body);

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
