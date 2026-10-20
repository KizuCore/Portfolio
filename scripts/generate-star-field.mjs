import { writeFileSync } from "node:fs";

// Les mêmes graines conservent la position, la taille et la couleur du ciel initial.
const noise = (seed) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};
const stars = Array.from({ length: 160 }, (_, index) => {
  const x = noise(index + 1) * 100;
  const y = noise(index + 201) * 100;
  const radius = 0.35 + Math.pow(noise(index + 401), 3) * 0.95;
  const opacity = 0.14 + noise(index + 601) * 0.44;
  const color = index % 11 === 0 ? "239,221,196" : index % 3 === 0 ? "232,240,255" : "174,199,235";
  return `  <circle cx="${x.toFixed(2)}%" cy="${y.toFixed(2)}%" r="${radius.toFixed(2)}" fill="rgb(${color})" opacity="${opacity.toFixed(2)}"/>`;
});
// Sans viewBox, les coordonnées suivent le cadre et les rayons restent en pixels.
writeFileSync(new URL("../public/images/sky-distant-stars.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">\n${stars.join("\n")}\n</svg>\n`, "utf8");
