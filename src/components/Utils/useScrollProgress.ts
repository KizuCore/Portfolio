import { useEffect, useState } from "react";

/**
 * Hook personnalisé qui retourne le pourcentage de scroll d’un élément (ref)
 * visible dans la fenêtre du navigateur.
 * 
 * @param ref Référence vers un élément HTML à suivre
 * @returns scrollPercentage Nombre entre 0 et 100 indiquant la progression de visibilité
 */
const useScrollProgress = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollPercentage, setScrollPercentage] = useState(0); // État du pourcentage de scroll

  useEffect(() => {
    // Fonction appelée à chaque scroll
    const handleScroll = () => {
      if (!ref.current) return; // Si l’élément n’existe pas, on sort

      // Récupère les dimensions de l’élément par rapport à la fenêtre
      const { top, height } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      /**
       * Calcul du pourcentage de l’élément visible :
       * (hauteur de la fenêtre - position top) / (hauteur de l’élément)
       * Puis on le limite entre 0 (pas visible) et 1 (entièrement visible ou plus)
       */
      const scrolled = Math.min(Math.max((windowHeight - top) / (height * 1.05), 0), 1);

      // Met à jour l’état avec une valeur entre 0 et 100
      setScrollPercentage(scrolled * 100);
    };

    handleScroll(); // Déclenche une première fois au chargement

    // Écoute l’événement de scroll
    window.addEventListener("scroll", handleScroll);

    // Nettoyage : supprime l’écouteur lors du démontage
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return scrollPercentage;
};

export default useScrollProgress;
