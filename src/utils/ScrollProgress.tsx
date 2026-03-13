import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
      const scrollableHeight = getScrollableHeight();
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
      scheduleUpdate();
    };

    updateProgress();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(handleResize)
      : null;

    resizeObserver?.observe(document.body);
    resizeObserver?.observe(document.documentElement);

    const mutationObserver = typeof MutationObserver !== "undefined"
      ? new MutationObserver(scheduleUpdate)
      : null;

    mutationObserver?.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
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
