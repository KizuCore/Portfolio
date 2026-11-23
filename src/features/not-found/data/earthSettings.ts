// Vue initiale et marge réservée à l’atmosphère, en pourcentage du globe.
export const EARTH_VIEW = {
  longitude: 12,
  latitude: 12,
  radius: 49.4,
} as const;

// Les nuages avancent légèrement plus vite que les continents.
export const EARTH_ANIMATION = {
  durationMs: 72_000,
  framesPerSecond: 24,
  cloudSpeed: 1.12,
} as const;
