import { useEffect, useState } from "react";

function useSequence(setShowModal) {
  const [, setInput] = useState([]);
  useEffect(() => {
    const asciiEncodedSequence = [103, 97, 121];// Séquence 
    const decodeSequence = () => asciiEncodedSequence.map(code => String.fromCharCode(code));

    const handleKeyDown = (event) => {
      const decodedGASequence = decodeSequence();

      setInput((prevInput) => {
        const newInput = [...prevInput, event.key.toLowerCase()].slice(-decodedGASequence.length);

        // Séquence détectée
        if (JSON.stringify(newInput) === JSON.stringify(decodedGASequence)) {
          setTimeout(() => {
            setShowModal(true); // Affiche video
          }, 0);
        }

        return newInput;
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowModal]);

  return null;
}

export default useSequence;
