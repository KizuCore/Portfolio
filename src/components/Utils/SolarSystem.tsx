import { motion } from "framer-motion";
import '../../assets/styles/About/SolarSystem.css';
import { useTranslation } from "react-i18next";
import CelestialBody from "./CelestialBody";

function generateAsteroids(count: number) {
    const asteroids = [];

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 360;
        const radius = 94 + Math.random() * 8;

        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * radius;
        const y = Math.sin(radian) * radius;

        asteroids.push(
            <div
                key={i}
                className="asteroid"
                style={{
                    transform: `translate(${x}px, ${y}px)`
                }}
            />
        );
    }

    return asteroids;
}


function SolarSystem() {
    const { t } = useTranslation();

    return (
        <motion.div
            className="solar-container pb-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="solar-system">
                <CelestialBody className="sun" name={t("solar_system.sun")} isSun />

                <div className="orbit orbit-mercure">
                    <CelestialBody className="planet-mercure" name={t("solar_system.mercury")} />
                </div>
                <div className="orbit orbit-venus">
                    <CelestialBody className="planet-venus" name={t("solar_system.venus")} />
                </div>
                <div className="orbit orbit-earth">
                    <CelestialBody className="planet-earth" name={t("solar_system.earth")}>
                        <div className="moon" />
                    </CelestialBody>
                </div>
                <div className="orbit orbit-mars">
                    <CelestialBody className="planet-mars" name={t("solar_system.mars")} />
                </div>

                <div className="asteroid-belt">{generateAsteroids(150)}</div>

                <div className="orbit orbit-jupiter">
                    <CelestialBody className="planet-jupiter" name={t("solar_system.jupiter")} />
                </div>
                <div className="orbit orbit-saturne">
                    <CelestialBody className="planet-saturne" name={t("solar_system.saturn")} />
                </div>
                <div className="orbit orbit-uranus">
                    <CelestialBody className="planet-uranus" name={t("solar_system.uranus")} />
                </div>
                <div className="orbit orbit-neptune">
                    <CelestialBody className="planet-neptune" name={t("solar_system.neptune")} />
                </div>
                {/* Astéroïdes TODO */}
            </div>
        </motion.div>
    );
}

export default SolarSystem;
