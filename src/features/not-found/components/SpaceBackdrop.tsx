import { useMemo, useRef } from "react";
import { EARTH_CLOUDS } from "../data/earthClouds";
import { EARTH_ARID, EARTH_ICE, EARTH_SEA_ICE } from "../data/earthClimate";
import { createEarthProjector } from "../utils/earthProjection";
import useEarthRotation from "../hooks/useEarthRotation";
import { EARTH_VIEW } from "../data/earthSettings";
import "../styles/SpaceBackdrop.css";

export default function SpaceBackdrop() {
  const land = useRef<HTMLSpanElement>(null);
  const clouds = useRef<HTMLDivElement>(null);
  const arid = useRef<HTMLSpanElement>(null);
  const ice = useRef<HTMLSpanElement>(null);
  const seaIce = useRef<HTMLSpanElement>(null);
  const initialLand = useMemo(() => createEarthProjector()(EARTH_VIEW.longitude), []);
  const initialClouds = useMemo(() => createEarthProjector(EARTH_CLOUDS)(EARTH_VIEW.longitude), []);
  const initialArid = useMemo(() => createEarthProjector(EARTH_ARID)(EARTH_VIEW.longitude), []);
  const initialIce = useMemo(() => createEarthProjector(EARTH_ICE)(EARTH_VIEW.longitude), []);
  const initialSeaIce = useMemo(() => createEarthProjector(EARTH_SEA_ICE)(EARTH_VIEW.longitude), []);
  useEarthRotation({ land, clouds, arid, ice, seaIce });
  return <div className="not-found-astronomy" aria-hidden="true">
    <div className="not-found-planet-system">
      <div className="not-found-planet">
        <div className="not-found-earth-surface">
          <span className="earth-sea-ice-layer">
            <span ref={seaIce} className="earth-sea-ice" style={{ clipPath: initialSeaIce }} />
          </span>
          <span ref={land} className="earth-land" style={{ clipPath: initialLand }}>
            <span className="earth-arid-layer">
              <span ref={arid} className="earth-arid" style={{ clipPath: initialArid }} />
            </span>
            <span className="earth-ice-layer">
              <span ref={ice} className="earth-ice" style={{ clipPath: initialIce }} />
            </span>
          </span>
        </div>
        <div className="not-found-earth-cloud-layer">
          <div ref={clouds} className="not-found-earth-clouds" style={{ clipPath: initialClouds }} />
        </div>
      </div>
    </div>
  </div>;
}
