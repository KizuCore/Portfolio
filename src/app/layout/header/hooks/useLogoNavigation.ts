import { useCallback, useEffect, useRef, useState } from "react";
import type { NavigateFunction } from "react-router-dom";

const FAST_CLICK_THRESHOLD = 500;
const LONG_CLICK_REDIRECT_DELAY = 9500;

// Isole l’interaction cachée du logo de l’état visuel de la barre de navigation.
export function useLogoNavigation(navigate: NavigateFunction, homePath: string) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLongClick, setIsLongClick] = useState(false);
  const [isClickValid, setIsClickValid] = useState(false);

  const redirectTimeoutRef = useRef<number | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);

  const clearLogoTimers = useCallback(() => {
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
  }, []);

  useEffect(() => {
    return clearLogoTimers;
  }, [clearLogoTimers]);

  const handleMouseDown = () => {
    setIsAnimating(true);
    setIsClickValid(true);
    setIsLongClick(false);

    clickTimeoutRef.current = window.setTimeout(() => {
      setIsLongClick(true);
      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate("/arcane");
      }, LONG_CLICK_REDIRECT_DELAY);
    }, FAST_CLICK_THRESHOLD);
  };

  const handleMouseUp = () => {
    setIsAnimating(false);

    clearLogoTimers();

    if (!isLongClick && isClickValid) {
      navigate(homePath);
    }

    setIsClickValid(false);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
    setIsLongClick(false);
    setIsClickValid(false);
    clearLogoTimers();
  };

  return { isAnimating, handleMouseDown, handleMouseUp, handleMouseLeave };
}
