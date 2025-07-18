import { useEffect, useState } from "react";

const useScrollProgress = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const { top, height } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrolled = Math.min(Math.max((windowHeight - top) / (height * 1.1), 0), 1);

      setScrollPercentage(scrolled * 100);
    };

    handleScroll(); // trigger once
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return scrollPercentage;
};

export default useScrollProgress;
