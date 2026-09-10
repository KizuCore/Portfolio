import { useEffect, useState } from "react";

/**
 * Suit la progression d’un élément dans la zone visible de la page.
 *
 * @param ref Élément HTML à observer.
 * @returns Une valeur de 0 à 100 représentant la progression du défilement visible.
 */
const useElementScrollProgress = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const { top, height } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Borne le rapport calculé pour que les styles CSS ne reçoivent que des valeurs entre 0 et 100.
      const scrolled = Math.min(Math.max((windowHeight - top) / (height * 1.05), 0), 1);
      setScrollPercentage(scrolled * 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return scrollPercentage;
};

export default useElementScrollProgress;
