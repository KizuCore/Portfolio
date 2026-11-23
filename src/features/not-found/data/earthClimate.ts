import { geoCircle } from "d3-geo";
import type { GeometryCollection, Polygon, Position } from "geojson";

// Zones climatiques simplifiées pour le décor, sans prétendre à une carte scientifique.
function region(points: Position[]): Polygon {
  const area = points.reduce((sum, p, i) => {
    const next = points[(i + 1) % points.length];
    return sum + p[0] * next[1] - next[0] * p[1];
  }, 0);
  const ring = area > 0 ? [...points].reverse() : points;
  return { type: "Polygon", coordinates: [[...ring, ring[0]]] };
}

export const EARTH_ARID: GeometryCollection = {
  type: "GeometryCollection",
  geometries: [
    region([[-17, 29], [-4, 34], [14, 33], [33, 29], [34, 19], [22, 15], [7, 16], [-5, 18], [-17, 22]]),
    region([[34, 29], [46, 32], [59, 24], [52, 15], [43, 13], [37, 21]]),
    region([[49, 34], [64, 39], [71, 30], [61, 24], [54, 27]]),
    region([[78, 43], [94, 47], [113, 44], [110, 38], [91, 37], [80, 39]]),
    region([[116, -23], [125, -19], [139, -23], [141, -29], [131, -33], [119, -30]]),
    region([[12, -19], [19, -18], [28, -23], [24, -30], [15, -29]]),
    region([[-117, 37], [-110, 38], [-102, 29], [-106, 24], [-115, 28]]),
    region([[-72, -17], [-68, -18], [-68, -28], [-71, -30]]),
  ],
};

export const EARTH_ICE: GeometryCollection = {
  type: "GeometryCollection",
  geometries: [
    geoCircle().center([0, 90]).radius(19).precision(4)(),
    geoCircle().center([0, -90]).radius(25).precision(4)(),
    region([[-58, 61], [-40, 60], [-22, 69], [-16, 80], [-45, 85], [-64, 78]]),
  ],
};

// La banquise est dessinée sur l’océan, indépendamment des glaces continentales.
// Sa bordure irrégulière évite une bande blanche uniforme ; son étendue n’est pas saisonnière.
export const EARTH_SEA_ICE: GeometryCollection = {
  type: "GeometryCollection",
  geometries: ([ [90, 12], [-90, 22] ] as const).map(([pole, radius]) => {
    const cap = geoCircle().center([0, pole]).radius(radius).precision(4)();
    const ring = cap.coordinates[0].map(([longitude, latitude]) => {
      const angle = longitude * Math.PI / 180;
      return [longitude, latitude + 1.2 * Math.sin(3 * angle) + 0.5 * Math.cos(7 * angle)];
    });
    ring[ring.length - 1] = ring[0];
    return { type: "Polygon", coordinates: [ring] };
  }),
};
