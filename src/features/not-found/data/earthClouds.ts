import type { GeometryCollection } from "geojson";

// Nappes nuageuses irrégulières réparties autour du globe.
// Les coordonnées définissent leur silhouette ; le CSS adoucit les bords et règle la transparence.
const FIELDS = [
  [-43, 43, 21, 9, 0.3], [-14, 54, 16, 7, 1.7], [9, 27, 13, 6, 0.9],
  [-17, -8, 17, 7, 2.4], [22, -33, 24, 8, 1.2], [52, 12, 13, 8, 3.1],
  [79, 43, 20, 9, 0.5], [118, -22, 22, 9, 1.9], [151, 30, 18, 7, 2.7],
  [-147, -13, 22, 8, 1.1], [-111, 32, 18, 9, 2.1], [-91, -40, 25, 8, 0.7],
];

export const EARTH_CLOUDS: GeometryCollection = {
  type: "GeometryCollection",
  geometries: FIELDS.map(([longitude, latitude, width, height, phase]) => {
    const ring = Array.from({ length: 48 }, (_, index) => {
      const angle = -index / 48 * Math.PI * 2;
      const edge = 1 + 0.17 * Math.sin(3 * angle + phase) + 0.09 * Math.sin(7 * angle - phase);
      return [longitude + Math.cos(angle) * width / 2 * edge, latitude + Math.sin(angle) * height / 2 * edge];
    });
    return { type: "Polygon", coordinates: [[...ring, ring[0]]] };
  }),
};
