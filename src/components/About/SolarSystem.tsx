import { motion } from "framer-motion";
import '../../assets/styles/About/SolarSystem.css';
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import CelestialBody from "../Utils/CelestialBody";


/* Génération dynamique des astéroïdes */
// Cette fonction génère un tableau d'éléments astéroïdes avec des positions et tailles aléatoires
function generateAsteroidsDynamic(count: number, radiusMin: number, radiusMax: number) {
    const asteroids = [];

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 360;
        const radius = radiusMin + Math.random() * (radiusMax - radiusMin);

        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * radius;
        const y = Math.sin(radian) * radius;
        const size = 1 + Math.random() * 2;

        asteroids.push(
            <div
                key={i}
                className="asteroid"
                style={{
                    transform: `translate(${x}px, ${y}px)`,
                    width: `${size}px`,
                    height: `${size}px`
                }}
            />
        );
    }

    return asteroids;
}

/* Fonction pour générer un délai aléatoire pour les orbites des planètes */
/* L’animation-delay négatif décale le point de départ de l’animation rotate() → on obtient des positions initiales aléatoires, sans casser la rotation orbitale autour du Soleil */
function randomOrbitDelay(maxDurationInSec: number) {
    return `-${Math.floor(Math.random() * maxDurationInSec)}s`;
}


function SolarSystem() {
    const { t } = useTranslation();
    const delays = useMemo(() => ({
        mercure: randomOrbitDelay(6),
        venus: randomOrbitDelay(9),
        earth: randomOrbitDelay(12),
        mars: randomOrbitDelay(18),
        jupiter: randomOrbitDelay(36),
        saturn: randomOrbitDelay(60),
        uranus: randomOrbitDelay(84),
        neptune: randomOrbitDelay(120)
    }), []);


    return (
        <motion.div
            className="solar-container pb-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="solar-system">
                <CelestialBody className="sun" name={t("solar_system.sun")} isSun />

                <div className="orbit orbit-mercure" style={{ animationDelay: delays.mercure }}>
                    <CelestialBody className="planet-mercure" name={t("solar_system.mercury")} />
                </div>


                <div className="orbit orbit-venus" style={{ animationDelay: delays.venus }}>
                    <CelestialBody className="planet-venus" name={t("solar_system.venus")} />
                </div>
                <div className="orbit orbit-earth" style={{ animationDelay: delays.earth }}>
                    <CelestialBody className="planet-earth" name={t("solar_system.earth")}>
                        <div className="moon" />
                    </CelestialBody>
                </div>
                <div className="orbit orbit-mars" style={{ animationDelay: delays.mars }}>
                    <CelestialBody className="planet-mars" name={t("solar_system.mars")} />
                </div>

                <div className="asteroid-belt">{generateAsteroidsDynamic(200, 94, 102)}</div>


                <div className="orbit orbit-jupiter" style={{ animationDelay: delays.jupiter }}>
                    <CelestialBody className="planet-jupiter" name={t("solar_system.jupiter")} />
                </div>
                <div className="orbit orbit-saturne" style={{ animationDelay: delays.saturn }}>
                    <CelestialBody className="planet-saturne" name={t("solar_system.saturn")} />
                </div>
                <div className="orbit orbit-uranus" style={{ animationDelay: delays.uranus }}>
                    <CelestialBody className="planet-uranus" name={t("solar_system.uranus")} />
                </div>
                <div className="orbit orbit-neptune" style={{ animationDelay: delays.neptune }}>
                    <CelestialBody className="planet-neptune" name={t("solar_system.neptune")} />
                </div>
                <div className="asteroid-belt">{generateAsteroidsDynamic(300, 190, 220)}</div>

            </div>
        </motion.div>
    );
}

export default SolarSystem;
