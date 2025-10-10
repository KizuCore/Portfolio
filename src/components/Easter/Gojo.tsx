import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "../../assets/styles/Easter/style_easter.css";
import "../../assets/styles/Easter/Gojo/Gojo.css";
import Particle from "../../utils/Particle";

// Durées clés timeline
const T = {
    preload: 2200,
    converge: 1800,
    fuse: 800,
    shock: 900,
    hold: 700,
    toVideo: 800,
};

export default function GojoCursedTechnique() {
    const prefersReduced = useReducedMotion();
    const [phase, setPhase] = useState<"preload" | "converge" | "fuse" | "shock" | "video">("preload");



    // Lance timeline une fois
    useEffect(() => {
        let t1: any, t2: any, t3: any, t4: any;

        t1 = setTimeout(() => setPhase("converge"), T.preload);
        t2 = setTimeout(() => setPhase("fuse"), T.preload + T.converge);
        t3 = setTimeout(() => setPhase("shock"), T.preload + T.converge + T.fuse);
        t4 = setTimeout(() => setPhase("video"), T.preload + T.converge + T.fuse + T.shock + T.hold);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, []);

    const sphereBase = useMemo(
        () => ({
            initial: { opacity: 0, scale: 0.8, filter: "brightness(1)" },
            animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
            exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
        }),
        []
    );

    const shakeKeyframes = prefersReduced
        ? { x: 0, y: 0, rotate: 0 }
        : {
            x: [0, -6, 5, -4, 3, 0],
            y: [0, 3, -2, 2, -1, 0],
            rotate: [0, -1.5, 1.2, -1, 0.8, 0],
        };

    return (
        <section>
            <Container fluid className="about-section" id="home">
                <Particle />
                {/* Défs SVG (Gooey + Bloom) */}
                <svg width="0" height="0">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                            <feColorMatrix
                                in="blur"
                                type="matrix"
                                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 24 -15"
                            />
                        </filter>
                        <filter id="bloom">
                            <feGaussianBlur stdDeviation="6" result="soft" />
                            <feBlend in="SourceGraphic" in2="soft" mode="screen" />
                        </filter>
                    </defs>
                </svg>

                <div className="jk-wrapper">
                    {/* Vignette + fond animé */}
                    <div className="jk-bg" />
                    <div className="jk-vignette" />

                    {/* Message préload */}
                    <AnimatePresence>
                        {phase === "preload" && (
                            <motion.div
                                className="preload-message title-font-easter blue jk-pretitle"
                                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                                transition={{ duration: 0.6 }}
                            >
                                <GlitchText text="Nah, I'd win..." />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stage 1–2 : convergence rouge/bleu */}
                    <AnimatePresence>
                        {(phase === "converge" || phase === "fuse") && (
                            <motion.div
                                className="jk-stage has-goo"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: phase === "fuse" ? 0.9 : 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                            >

                                <motion.div
                                    className="sphere red-sphere"
                                    style={{ position: "absolute", top: "50%", left: "50%", y: "-50%", x: "-50%" }}  // <-- centre fixe
                                    {...sphereBase}
                                    initial={{ x: "calc(-50% - 28vw)", scale: 0.9, opacity: 0.85 }}  // part à gauche
                                    animate={{
                                        x: "-50%",  // revient au centre sans toucher Y
                                        scale: phase === "fuse" ? 1.15 : 1,
                                        opacity: phase === "fuse" ? 0.9 : 1,
                                        transition: { duration: T.converge / 1000, ease: "easeInOut" },
                                    }}
                                />

                                <motion.div
                                    className="sphere blue-sphere"
                                    style={{ position: "absolute", top: "50%", left: "50%", y: "-50%", x: "-50%" }}
                                    {...sphereBase}
                                    initial={{ x: "calc(-50% + 28vw)", scale: 0.9, opacity: 0.85 }}  // part à droite
                                    animate={{
                                        x: "-50%",
                                        scale: phase === "fuse" ? 1.15 : 1,
                                        opacity: phase === "fuse" ? 0.9 : 1,
                                        transition: { duration: T.converge / 1000, ease: "easeInOut" },
                                    }}
                                />

                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stage 3 : fusion → sphère violette + flash + anneau de choc + shake */}
                    <AnimatePresence>
                        {(phase === "fuse" || phase === "shock") && (
                            <motion.div
                                className="jk-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {/* Flash court */}
                                <AnimatePresence>
                                    {phase === "fuse" && (
                                        <motion.div
                                            className="jk-flash"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.18 }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Purple core avec bloom + pulsation */}
                                <motion.div
                                    className="sphere purple-sphere jk-bloom"
                                    style={{ position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%" }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: phase === "fuse" ? [0.2, 1.15, 1] : [1, 1.03, 1],
                                        opacity: 1,
                                        boxShadow: [
                                            "0 0 25px rgba(165,34,252,0.55)",
                                            "0 0 60px rgba(165,34,252,0.85)",
                                            "0 0 38px rgba(165,34,252,0.7)",
                                        ],
                                    }}
                                    transition={{
                                        duration: phase === "fuse" ? T.fuse / 1000 : 1.2,
                                        ease: "easeOut",
                                        repeat: phase === "shock" ? Infinity : 0,
                                        repeatType: "mirror",
                                    }}
                                />


                                {/* Anneau de choc */}
                                <AnimatePresence>
                                    {/* Shockwave */}
                                    {phase === "shock" && (
                                        <motion.div
                                            className="jk-shockwave"
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                x: "-50%",
                                                y: "-50%",
                                                transformOrigin: "50% 50%",
                                                boxSizing: "border-box",
                                            }}
                                            initial={{ scale: 0.2, opacity: 0.9 }}
                                            animate={{ scale: 12, opacity: 0 }}
                                            transition={{ duration: T.shock / 1000, ease: "easeOut" }}
                                        />
                                    )}

                                </AnimatePresence>

                                {/* Camera shake  */}
                                {phase === "shock" && (
                                    <motion.div
                                        className="jk-shake-overlay"
                                        animate={shakeKeyframes}
                                        transition={{ duration: 0.45, ease: "easeOut" }}
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stage 4 : intro vidéo flottante */}
                    <AnimatePresence>
                        {phase === "video" && (
                            <motion.div
                                className="video-container opaque-video jk-video"
                                initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -16, 0, 12, 0],
                                    rotate: [0, 2.5, -2, 2, -1.5, 0],
                                    scale: 1,
                                    filter: "blur(0px)",
                                }}
                                transition={{
                                    opacity: { duration: T.toVideo / 1000 },
                                    y: { duration: 20, repeat: Infinity },
                                    rotate: { duration: 18, repeat: Infinity },
                                }}
                            >
                                <iframe
                                    className="embed-responsive-item pt-5"
                                    src="https://www.youtube.com/embed/JTGNRJEptc0?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0"
                                    title="Sukuna VS Gojo"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </section>
    );
}

/* ———————— Sous-composants —————————— */

// Texte glitch léger
function GlitchText({ text }: { text: string }) {
    return (
        <span className="jk-glitch" data-text={text}>
            {text}
        </span>
    );
}


