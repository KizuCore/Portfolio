import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour détecter une séquence de touches
 * Lorsqu'elle est détectée, cela déclenche l’ouverture d’une modale via setShowModal.
 */
function useSequence(setShowModal: (show: boolean) => void): void {
  // Stocke les dernières touches pressées
  const [, setInput] = useState<string[]>([]);

  useEffect(() => {
    // Séquence codée en ASCII
    const asciiEncodedSequence = [103, 97, 121];

    // Fonction pour décoder la séquence ASCII en lettres
    const decodeSequence = (): string[] =>
      asciiEncodedSequence.map((code) => String.fromCharCode(code));

    // Fonction déclenchée à chaque pression de touche
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore les événements sans touche valide
      if (!event.key) return;

      const decodedGASequence = decodeSequence();

      setInput((prevInput) => {
        // Ajoute la nouvelle touche à la suite, en gardant uniquement les N dernières
        const newInput = [...prevInput, event.key.toLowerCase()].slice(-decodedGASequence.length);

        // Si la séquence tapée correspond exactement à celle attendue
        if (JSON.stringify(newInput) === JSON.stringify(decodedGASequence)) {
          // Déclenche la modale (avec un petit délai pour éviter conflits d’état)
          setTimeout(() => {
            setShowModal(true);
          }, 0);
        }

        return newInput;
      });
    };

    // Écoute les événements clavier au niveau global
    window.addEventListener("keydown", handleKeyDown);

    // Nettoyage : supprime l’écouteur à la désactivation du hook
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowModal]);
}

export default useSequence;
