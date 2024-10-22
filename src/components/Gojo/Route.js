import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Utils/Particle";
import { motion } from "framer-motion";

function RouteSorciere() {
    const [preloading, setPreloading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section>
            <Container fluid className="about-section pt-0" id="home">
                <Particle />

                <Container className="d-flex justify-content-center align-items-center vh-100">
                    {preloading ? (
                        <div className="preload-message title-font" style={{ fontSize: "2.2em" }}>
                            Sonne, Sonne, le retour, des sorcières sur la route...
                        </div>
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
                                src="https://www.youtube.com/watch?v=_PtDZLqqNgQ?autoplay=1" 
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

export default RouteSorciere;
