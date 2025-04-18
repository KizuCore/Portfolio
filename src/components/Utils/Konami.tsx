import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const konamiCode = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

function useKonamiCode(): void {
  const [, setInput] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setInput((prevInput) => {
        const newInput = [...prevInput, event.key].slice(-konamiCode.length);

        if (JSON.stringify(newInput) === JSON.stringify(konamiCode)) {
          setTimeout(() => {
            navigate("/gojo");
          }, 0);
        }

        return newInput;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
}

export default useKonamiCode;
