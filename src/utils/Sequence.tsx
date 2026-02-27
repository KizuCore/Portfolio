import { useEffect, useState } from "react";

/**
 * Detects secret keyboard sequences and opens the Easter egg modal.
 */
function useSequence(setShowModal: (show: boolean) => void): void {
  const [, setInput] = useState("");

  useEffect(() => {
    // Encoded sequence
    const asciiEncodedSequence = [103, 97, 121];
    const decodedSequence = asciiEncodedSequence.map((code) => String.fromCharCode(code)).join("");
    const maxLength = decodedSequence.length;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.key || event.key.length !== 1) {
        return;
      }

      setInput((previousInput) => {
        const nextInput = (previousInput + event.key.toLowerCase()).slice(-maxLength);

        if (nextInput.endsWith(decodedSequence)) {
          setTimeout(() => {
            setShowModal(true);
          }, 0);
        }

        return nextInput;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowModal]);
}

export default useSequence;
