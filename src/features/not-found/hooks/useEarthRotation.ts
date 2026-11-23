import { useEffect, type RefObject } from "react";
import { createEarthProjector } from "../utils/earthProjection";
import { EARTH_CLOUDS } from "../data/earthClouds";
import { EARTH_ARID, EARTH_ICE, EARTH_SEA_ICE } from "../data/earthClimate";
import { EARTH_ANIMATION, EARTH_VIEW } from "../data/earthSettings";

type EarthLayerRefs = {
  land: RefObject<HTMLSpanElement>;
  clouds: RefObject<HTMLDivElement>;
  arid: RefObject<HTMLSpanElement>;
  ice: RefObject<HTMLSpanElement>;
  seaIce: RefObject<HTMLSpanElement>;
};

export default function useEarthRotation({
  land: landRef, clouds: cloudsRef, arid: aridRef, ice: iceRef, seaIce: seaIceRef,
}: EarthLayerRefs) {
  useEffect(() => {
    const land = landRef.current;
    const clouds = cloudsRef.current;
    const arid = aridRef.current;
    const ice = iceRef.current;
    const seaIce = seaIceRef.current;
    if (!land || !clouds || !arid || !ice || !seaIce) return;
    const layers = [
      { element: land, project: createEarthProjector(), speed: 1 },
      { element: clouds, project: createEarthProjector(EARTH_CLOUDS), speed: EARTH_ANIMATION.cloudSpeed },
      { element: arid, project: createEarthProjector(EARTH_ARID), speed: 1 },
      { element: ice, project: createEarthProjector(EARTH_ICE), speed: 1 },
      { element: seaIce, project: createEarthProjector(EARTH_SEA_ICE), speed: 1 },
    ];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let frame = 0;
    let elapsed = 0;
    let previousTime: number | undefined;
    let lastPaint = -Infinity;

    const tick = (now: number) => {
      if (previousTime !== undefined) elapsed += now - previousTime;
      previousTime = now;
      // Limite les calculs à 24 images/s sans modifier la durée d’un tour.
      if (now - lastPaint >= 1000 / EARTH_ANIMATION.framesPerSecond) {
        const turn = elapsed / EARTH_ANIMATION.durationMs * 360;
        for (const layer of layers) {
          layer.element.style.clipPath = layer.project(EARTH_VIEW.longitude + turn * layer.speed);
        }
        lastPaint = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      // Ignore le temps passé en pause pour éviter un saut à la reprise.
      previousTime = undefined;
      if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      update();
    }) : undefined;
    // Observe le cadre fixe, pas les continents dont la forme change à chaque image.
    observer?.observe(land.parentElement ?? land);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [landRef, cloudsRef, aridRef, iceRef, seaIceRef]);
}
