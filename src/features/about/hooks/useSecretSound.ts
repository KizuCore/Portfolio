import { useEffect, useRef, useState } from "react";
import secretSound from "@sound/voice.mp3";

export function useSecretSound() {
  const [secretClickCount, setSecretClickCount] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const audio = new Audio();
    // Le son secret se télécharge seulement lorsque le visiteur le déclenche.
    audio.preload = "none";
    audio.src = secretSound;
    audioRef.current = audio;
    return () => { audio.pause(); audioRef.current = null; };
  }, []);

  useEffect(() => {
    if (secretClickCount === 3 && audioRef.current) {
      void audioRef.current.play().catch(() => { /* Les réglages du navigateur peuvent bloquer le son. */ });
      setSecretClickCount(0);
      setIsCooldown(true);
    }
  }, [secretClickCount]);

  useEffect(() => {
    if (isCooldown) {
      const timer = setTimeout(() => setIsCooldown(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [isCooldown]);

  const handleSecretClick = () => {
    if (!isCooldown) setSecretClickCount((prev) => prev + 1);
  };

  return handleSecretClick;
}
