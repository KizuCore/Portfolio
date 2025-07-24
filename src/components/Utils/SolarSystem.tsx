import { motion } from "framer-motion";
import '../../assets/styles/About/SolarSystem.css';
import { useTranslation } from "react-i18next";

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
                <div className="sun" data-name={t("solar_system.sun")} />
                <div className="orbit orbit-mercure">
                    <div className="planet planet-mercure" data-name={t("solar_system.mercury")} />
                </div>
                <div className="orbit orbit-venus">
                    <div className="planet planet-venus" data-name={t("solar_system.venus")} />
                </div>
                <div className="orbit orbit-earth">
                    <div className="planet planet-earth" data-name={t("solar_system.earth")}>
                        <div className="moon"></div>
                    </div>
                </div>
                <div className="orbit orbit-mars">
                    <div className="planet planet-mars" data-name={t("solar_system.mars")} />
                </div>

                <div className="asteroid-belt">
                    {generateAsteroids(150)}
                </div>

                <div className="orbit orbit-jupiter">
                    <div className="planet planet-jupiter" data-name={t("solar_system.jupiter")} />
                </div>
                <div className="orbit orbit-saturne">
                    <div className="planet planet-saturne" data-name={t("solar_system.saturn")} />
                </div>
                <div className="orbit orbit-neptune">
                    <div className="planet planet-neptune" data-name={t("solar_system.neptune")} />
                </div>
                <div className="orbit orbit-uranus">
                    <div className="planet planet-uranus" data-name={t("solar_system.uranus")} />
                </div>
            </div>
        </motion.div>
    );
}

export default SolarSystem;
