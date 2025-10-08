import { useState, useEffect, JSX } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import '../../assets/styles/Easter/style_easter.css';
import WavyText from "./WayText";
import Particle from "../../utils/Particle";

function Gojo(): JSX.Element {
    const [preloading, setPreloading] = useState(true);
    const [showPurpleSphere, setShowPurpleSphere] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloading(false);
        }, 3000);

        const purpleSphereTimer = setTimeout(() => {
            setShowPurpleSphere(true);
        }, 4400);

        const videoTimer = setTimeout(() => {
            setShowVideo(true);
        }, 6000);

        return () => {
            clearTimeout(timer);
            clearTimeout(purpleSphereTimer);
            clearTimeout(videoTimer);
        };
    }, []);

    return (
        <section>
            <Container fluid className="about-section" id="home">
                <Particle />

                <Container className="d-flex-center">
                    {preloading ? (
                        <div className="preload-message title-font-easter blue">
                            <WavyText text="Nah, I'd win..." />
                        </div>

                    ) : !showVideo ? (
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: showPurpleSphere ? 0 : 1 }}
                            transition={{ duration: 2.5 }}
                            className="d-flex-center"
                        >
                            {/* Red Sphere */}
                            <motion.div
                                initial={{ x: "-150px", scale: 1 }}
                                animate={{ x: 0, scale: 1.2, opacity: 0 }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    opacity: { delay: 1.5, duration: 0.5 },
                                }}
                                className="sphere red-sphere"
                            />
                            {/* Blue Sphere */}
                            <motion.div
                                initial={{ x: "150px", scale: 1 }}
                                animate={{ x: 0, scale: 1.2, opacity: 0 }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    opacity: { delay: 1.5, duration: 0.5 },
                                }}
                                className="sphere blue-sphere"
                            />
                            {/* Purple Sphere */}

                            {showPurpleSphere && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        duration: 1.5,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 10,
                                        delay: 0.1,
                                    }}
                                    className="sphere purple-sphere"
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            animate={{
                                y: [0, -20, 0, 30, 0],   // léger mouvement haut-bas
                                rotate: [0, 5, -5, 5, -5, 0],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                            }}
                            className="video-container opaque-video"
                        >
                            <iframe
                                className="embed-responsive-item pt-5"
                                src="https://www.youtube.com/embed/JTGNRJEptc0?autoplay=1"
                                title="Sukuna VS Gojo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    )}
                </Container>
            </Container>
        </section>
    );
}
export default Gojo;
