import { useEffect, useState } from "react";

function useSequence(setShowModal: (show: boolean) => void): void {
  const [, setInput] = useState<string[]>([]);

  useEffect(() => {
    const asciiEncodedSequence = [103, 97, 121]; 
    const decodeSequence = (): string[] =>
      asciiEncodedSequence.map((code) => String.fromCharCode(code));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.key) return;

      const decodedGASequence = decodeSequence();

      setInput((prevInput) => {
        const newInput = [...prevInput, event.key.toLowerCase()].slice(-decodedGASequence.length);

        if (JSON.stringify(newInput) === JSON.stringify(decodedGASequence)) {
          setTimeout(() => {
            setShowModal(true);
          }, 0);
        }

        return newInput;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowModal]);
}

export default useSequence;
