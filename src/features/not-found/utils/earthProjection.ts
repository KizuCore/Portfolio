import { geoOrthographic, geoStream, type GeoPermissibleObjects, type GeoStream } from "d3-geo";
import { EARTH_GEOMETRY } from "../data/earthGeometry";
import { EARTH_VIEW } from "../data/earthSettings";

/** Projette l’hémisphère visible en coordonnées CSS, en conservant les trous des polygones. */
export function createEarthProjector(geometry: GeoPermissibleObjects = EARTH_GEOMETRY) {
  const projection = geoOrthographic().translate([50, 50]).scale(EARTH_VIEW.radius).precision(0.15).clipAngle(89.9);
  let points: string[] = [];
  let first = "";
  const sink: GeoStream = {
    polygonStart() {}, polygonEnd() {}, sphere() {},
    // Les allers-retours vers l’origine ont une surface nulle : ils relient les contours sans les remplir.
    lineStart() { first = ""; points.push("0% 0%"); },
    point(x, y) {
      const point = `${x.toFixed(2)}% ${y.toFixed(2)}%`;
      if (!first) first = point;
      points.push(point);
    },
    lineEnd() { if (first) points.push(first, "0% 0%"); },
  };

  return (longitude: number) => {
    points = [];
    projection.rotate([-((longitude % 360 + 360) % 360), -EARTH_VIEW.latitude]);
    geoStream(geometry, projection.stream(sink));
    return `polygon(evenodd, ${points.length ? points.join(",") : "0% 0%,0% 0%,0% 0%"})`;
  };
}
