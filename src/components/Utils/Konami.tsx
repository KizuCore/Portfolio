import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Définition du célèbre code Konami comme une séquence de touches
const konamiCode = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

/**
 * Hook personnalisé pour détecter le code Konami via le clavier.
 * Une fois la séquence complète tapée, redirige vers la route "/gojo".
 */
function useKonamiCode(): void {
  const [, setInput] = useState<string[]>([]); // On stocke la séquence tapée
  const navigate = useNavigate(); // Permet nav autre page

  useEffect(() => {
    // Fonction appelée à chaque appui sur une touche
    const handleKeyDown = (event: KeyboardEvent) => {
      setInput((prevInput) => {
        // Ajoute la touche à la séquence, en gardant uniquement les dernières N touches
        const newInput = [...prevInput, event.key].slice(-konamiCode.length);

        // Vérifie si la séquence tapée correspond exactement au code Konami
        if (JSON.stringify(newInput) === JSON.stringify(konamiCode)) {
          // Navigation vers gojo
          setTimeout(() => {
            navigate("/gojo");
          }, 0);
        }

        return newInput;
      });
    };

    // On attache l'écouteur d'événement dès que le composant est monté
    window.addEventListener("keydown", handleKeyDown);

    // Nettoyage : retire l'écouteur quand le composant est démonté
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
}

export default useKonamiCode;
