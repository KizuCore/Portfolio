import { motion } from "framer-motion";
import '../../assets/styles/About/SolarSystem.css';

function SolarSystem() {
    return (
        <motion.div
            className="solar-container pb-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="solar-system">
                <div className="sun" />
                <div className="orbit orbit-mercure">
                    <div className="planet planet-mercure" />
                </div>
                <div className="orbit orbit-venus">
                    <div className="planet planet-venus" />
                </div>
                <div className="orbit orbit-earth">
                    <div className="planet planet-earth">
                        <div className="moon"></div>
                    </div>
                </div>
                <div className="orbit orbit-mars">
                    <div className="planet planet-mars" />
                </div>
                <div className="orbit orbit-saturne">
                    <div className="planet planet-saturne" />
                </div>
                <div className="orbit orbit-jupiter">
                    <div className="planet planet-jupiter" />
                </div>
                <div className="orbit orbit-neptune">
                    <div className="planet planet-neptune" />
                </div>
                <div className="orbit orbit-uranus">
                    <div className="planet planet-uranus" />
                </div>
            </div>
        </motion.div>
    );
}

export default SolarSystem;
