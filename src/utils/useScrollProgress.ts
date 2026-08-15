import { useEffect, useState } from "react";

/**
 * Tracks how far an element has progressed through the viewport.
 *
 * @param ref HTML element to observe.
 * @returns A value between 0 and 100 representing the visible scroll progress.
 */
const useScrollProgress = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const { top, height } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Clamp the computed ratio so CSS consumers never receive values outside 0-100.
      const scrolled = Math.min(Math.max((windowHeight - top) / (height * 1.05), 0), 1);
      setScrollPercentage(scrolled * 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return scrollPercentage;
};

export default useScrollProgress;
