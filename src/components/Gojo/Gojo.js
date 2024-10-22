import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Utils/Particle";
import { motion } from "framer-motion";

function Gojo() {
    const [preloading, setPreloading] = useState(true);
    const [showPurpleSphere, setShowPurpleSphere] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloading(false);
        }, 3000);

        const purpleSphereTimer = setTimeout(() => {
            setShowPurpleSphere(true);
        }, 4400); // Purple sphere apres 1.5sec

        const videoTimer = setTimeout(() => {
            setShowVideo(true);
        }, 5500); // Video après 1 sec

        return () => {
            clearTimeout(timer);
            clearTimeout(purpleSphereTimer);
            clearTimeout(videoTimer);
        };
    }, []);

    return (
        <section>
            <Container fluid className="about-section pt-0" id="home">
                <Particle />

                <Container className="d-flex justify-content-center align-items-center vh-100">
                    {preloading ? (
                        <div className="preload-message title-font blue" style={{ fontSize: "2.5em" }}>
                            Nah, I'd win...
                        </div>
                    ) : !showVideo ? (
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: showPurpleSphere ? 0 : 1 }}
                            transition={{ duration: 1.5 }}
                            className="d-flex justify-content-center align-items-center"
                            style={{ width: "100%", height: "100%", position: "relative" }}
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
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    background: "radial-gradient(circle at 30% 30%, #ff5f6d, #d40000)",
                                    boxShadow: "0px 0px 15px rgba(255, 95, 109, 0.7)",
                                    position: "absolute",
                                    left: "calc(50% - 100px)",
                                }}
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
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    background: "radial-gradient(circle at 30% 30%, #5f9eff, #0040d4)",
                                    boxShadow: "0px 0px 15px rgba(95, 158, 255, 0.7)",
                                    position: "absolute",
                                    right: "calc(50% - 100px)",
                                }}
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
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "50%",
                                        background: "radial-gradient(circle at 30% 30%, #c471ed, #9147ff)",
                                        boxShadow: "0px 0px 20px rgba(196, 113, 237, 0.7)",
                                        position: "absolute",
                                        left: "calc(50% - 75px)",
                                        top: "calc(50% - 75px)", 
                                    }}
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: 360 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                duration: 1.5,
                                type: "spring",
                                stiffness: 80,
                                damping: 15,
                            }}
                            className="video-container"
                            style={{ width: "100%", maxWidth: "800px", height: "auto" }}
                        >
                            <iframe
                                className="embed-responsive-item"
                                style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                                src="https://www.youtube.com/embed/JTGNRJEptc0?autoplay=1" 
                                title="YouTube video player"
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
