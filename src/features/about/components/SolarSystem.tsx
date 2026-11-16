import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/SolarSystem.css";

// A decorative illustration: distances and sizes are deliberately stylized.
const planets = [
  { key: "mercury", orbit: 39, size: 3, angle: 205, duration: 38, light: "#d5cbbc", color: "#817b78" },
  { key: "venus", orbit: 62, size: 5, angle: 315, duration: 55, light: "#f1d4a1", color: "#ae8057" },
  { key: "earth", orbit: 88, size: 6.5, angle: 125, duration: 75, light: "#99d5df", color: "#326fa4" },
  { key: "mars", orbit: 112, size: 4, angle: 25, duration: 98, light: "#e4ac87", color: "#a45a47" },
  { key: "jupiter", orbit: 149, size: 12, angle: 230, duration: 145, light: "#edcfaa", color: "#ac7f64" },
  { key: "saturn", orbit: 186, size: 9, angle: 345, duration: 195, light: "#ead9b5", color: "#b39a71" },
  { key: "uranus", orbit: 218, size: 6, angle: 155, duration: 240, light: "#c0e0e2", color: "#6d9eaf" },
  { key: "neptune", orbit: 248, size: 6, angle: 60, duration: 290, light: "#8caee4", color: "#4569a6" },
  { key: "pluto", orbit: 271, size: 2.5, angle: 285, duration: 340, light: "#d1bda8", color: "#8c796b" },
];
const flatten = 0.57;
const position = (radius: number, degrees: number) => {
  const angle = degrees * Math.PI / 180;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius * flatten];
};
const orbitPath = (radius: number, angle: number) => {
  const [x, y] = position(radius, angle);
  return `M${x},${y} A${radius},${radius * flatten} 0 1 1 ${-x},${-y} A${radius},${radius * flatten} 0 1 1 ${x},${y}`;
};
const belts = [
  { key: "asteroids", count: 130, radius: 124, spread: 14, duration: 90 },
  { key: "kuiper", count: 220, radius: 260, spread: 23, duration: 160 },
].map(belt => ({ ...belt, particles: Array.from({ length: belt.count }, (_, i) => {
  const radius = belt.radius + ((i * 17) % 31) / 30 * belt.spread;
  const [cx, cy] = position(radius, i * 137.508);
  return { cx, cy: cy / flatten, r: i % 5 === 0 ? 1.65 : 0.85, opacity: 0.35 + (i % 4) * 0.13 };
}) }));

export default function SolarSystem() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const animate = reduceMotion === false;
  const id = useId().replace(/:/g, "");
  const [activeName, setActiveName] = useState<string | null>(null);
  const name = (key: string) => key === "pluto" ? t("solar_pluto_name") : t(`solar_system.${key}`);

  return <motion.div className="solar-container"
    initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }}
    viewport={{ once: true }} transition={{ duration: 0.8 }}>
    <div className="solar-stage" onPointerLeave={() => setActiveName(null)}
      onPointerOver={event => setActiveName((event.target as Element).closest("[data-body-name]")?.getAttribute("data-body-name") ?? null)}>
      <svg className="solar-illustration" viewBox="0 0 600 440" role="img"
        aria-label={[t("solar_system.sun"), ...planets.map(planet => name(planet.key))].join(", ")}>
        <defs>
          <radialGradient id={`${id}-sun`} cx="35%" cy="30%" r="70%">
            <stop stopColor="#fff3d0" /><stop offset=".45" stopColor="#f5cf83" /><stop offset="1" stopColor="#cb8d43" />
          </radialGradient>
          <radialGradient id={`${id}-halo`}><stop stopColor="#eab96e" stopOpacity=".16" /><stop offset="1" stopColor="#eab96e" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${id}-shade`} cx="28%" cy="25%" r="75%">
            <stop offset=".2" stopColor="#071222" stopOpacity="0" /><stop offset=".75" stopColor="#071222" stopOpacity=".2" /><stop offset="1" stopColor="#071222" stopOpacity=".85" />
          </radialGradient>
          {planets.map(planet => <radialGradient key={planet.key} id={`${id}-${planet.key}`} cx="30%" cy="25%" r="80%">
            <stop stopColor={planet.light} /><stop offset="1" stopColor={planet.color} />
          </radialGradient>)}
          <clipPath id={`${id}-jupiter-clip`}><circle r="12" /></clipPath>
        </defs>
        <g transform="translate(300 220) rotate(-24)">
          <circle r="82" fill={`url(#${id}-halo)`} />
          {planets.filter(planet => planet.key !== "pluto").map(planet =>
            <ellipse key={planet.key} rx={planet.orbit} ry={planet.orbit * flatten}
              className={`solar-orbit${planet.key === "earth" ? " solar-orbit-earth" : ""}`} />)}
          {belts.map(belt => <g key={belt.key} transform={`scale(1 ${flatten})`} fill="#c5d9ef" aria-hidden="true">
            <g>
              {animate && <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={`${belt.duration}s`} repeatCount="indefinite" />}
              {belt.particles.map((particle, index) => <circle key={index} {...particle} />)}
            </g>
          </g>)}
          <g data-body-name={t("solar_system.sun")}><title>{t("solar_system.sun")}</title>
            <circle r="17" className="solar-sun" fill={`url(#${id}-sun)`} />
          </g>
          {planets.map(planet => {
            const [x, y] = position(planet.orbit, planet.angle);
            return <g key={planet.key} transform={animate ? undefined : `translate(${x} ${y})`} data-body-name={name(planet.key)}>
              <title>{name(planet.key)}</title>
              {animate && <animateMotion path={orbitPath(planet.orbit, planet.angle)} dur={`${planet.duration * 0.35}s`} repeatCount="indefinite" />}
              {planet.key === "saturn" && <ellipse rx="19" ry="6" transform="rotate(-12)" fill="none" stroke="#ad9875" strokeWidth="3" opacity=".75" />}
              <circle r={planet.size} fill={`url(#${id}-${planet.key})`} />
              {planet.key === "jupiter" && <g clipPath={`url(#${id}-jupiter-clip)`} stroke="#94664e" opacity=".38" fill="none">
                <path d="M-13-6Q0-3 13-6M-13 1Q0 4 13 1M-13 7Q0 10 13 7" strokeWidth="2.5" />
              </g>}
              {planet.key === "earth" && <path d="m-3-4 3 1 1 3-3 2-2-3Zm5 6 2 1-1 2-2-1Z" fill="#8cb39e" />}
              <circle r={planet.size} fill={`url(#${id}-shade)`} />
              {planet.key === "saturn" && <path d="M-19 0A19 6 0 0 0 19 0" transform="rotate(-12)" fill="none" stroke="#ddc9a4" strokeWidth="3" opacity=".9" />}
              {planet.key === "earth" && <g>
                {animate && <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s" repeatCount="indefinite" />}
                <circle cx="9.5" cy="0" r="1.1" fill="#bdc9d8" />
              </g>}
            </g>;
          })}
        </g>
      </svg>
    </div>
    <div className="solar-controls"><p aria-live="polite">{activeName ?? ""}</p></div>
  </motion.div>;
}
