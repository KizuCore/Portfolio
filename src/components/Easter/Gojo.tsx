import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "../../assets/styles/Easter/style_easter.css";
import "../../assets/styles/Easter/Gojo/Gojo.css";
import Particle from "../../utils/Particle";

type GojoPhase = "prelude" | "duality" | "compression" | "purple" | "video";

const T = {
  prelude: 1600,
  duality: 1900,
  compression: 900,
  purple: 1000,
  hold: 500,
};

export default function GojoCursedTechnique() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<GojoPhase>("prelude");

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("video");
      return;
    }

    const t1 = window.setTimeout(() => setPhase("duality"), T.prelude);
    const t2 = window.setTimeout(() => setPhase("compression"), T.prelude + T.duality);
    const t3 = window.setTimeout(() => setPhase("purple"), T.prelude + T.duality + T.compression);
    const t4 = window.setTimeout(
      () => setPhase("video"),
      T.prelude + T.duality + T.compression + T.purple + T.hold
    );

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="gojo-route" aria-label="Gojo Hollow Purple easter egg">
      <Container fluid className="gojo-shell p-0" id="home">
        <Particle />

        <div className="jk-wrapper">
          <div className="jk-bg" aria-hidden="true" />
          <div className="jk-vignette" aria-hidden="true" />

          <AnimatePresence mode="wait">
            {phase === "prelude" && (
              <motion.div
                key="prelude"
                className="preload-message title-font-easter jk-pretitle"
                initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.48, ease: "easeOut" }}
              >
                <p className="jk-kicker">CURSED TECHNIQUE</p>
                <h1 className="jk-title">Blue + Red</h1>
                <p className="jk-subtitle">Hollow Purple</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(phase === "duality" || phase === "compression") && (
              <motion.div
                key="duality"
                className="jk-arena"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.32 } }}
              >
                <div className="jk-center-anchor">
                  <motion.div
                    className="jk-orb jk-orb-red"
                    initial={{ x: "-36vw", y: 8, opacity: 0, rotate: -10, scale: 0.86 }}
                    animate={
                      phase === "duality"
                        ? {
                            x: ["-36vw", "-20vw", "-16vw"],
                            y: [8, 0, -6],
                            opacity: [0, 1, 0.95],
                            rotate: [-10, -5, -2],
                            scale: [0.86, 1.04, 1],
                          }
                        : {
                            x: "-5.2vw",
                            y: 0,
                            opacity: [0.95, 1, 0.88],
                            rotate: [-2, 0, -1],
                            scale: [1, 1.12, 1],
                          }
                    }
                    transition={{
                      duration: phase === "duality" ? T.duality / 1000 : T.compression / 1000,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="jk-tech-label">Red</span>
                  </motion.div>
                </div>

                <div className="jk-center-anchor">
                  <motion.div
                    className="jk-orb jk-orb-blue"
                    initial={{ x: "36vw", y: -8, opacity: 0, rotate: 10, scale: 0.86 }}
                    animate={
                      phase === "duality"
                        ? {
                            x: ["36vw", "20vw", "16vw"],
                            y: [-8, 0, 6],
                            opacity: [0, 1, 0.95],
                            rotate: [10, 5, 2],
                            scale: [0.86, 1.04, 1],
                          }
                        : {
                            x: "5.2vw",
                            y: 0,
                            opacity: [0.95, 1, 0.88],
                            rotate: [2, 0, 1],
                            scale: [1, 1.12, 1],
                          }
                    }
                    transition={{
                      duration: phase === "duality" ? T.duality / 1000 : T.compression / 1000,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="jk-tech-label">Blue</span>
                  </motion.div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === "purple" && (
              <motion.div
                key="purple"
                className="jk-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="jk-purple-flash"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                />

                <motion.div
                  className="jk-purple-halo"
                  initial={{ scale: 0.2, opacity: 0.8 }}
                  animate={{ scale: 4.8, opacity: 0 }}
                  transition={{ duration: T.purple / 1000, ease: "easeOut" }}
                />

                <motion.div
                  className="jk-purple-core"
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{
                    scale: [0.2, 1.24, 1],
                    opacity: [0, 1, 1],
                    boxShadow: [
                      "0 0 28px rgba(152,82,255,0.55)",
                      "0 0 90px rgba(181,115,255,0.95)",
                      "0 0 52px rgba(166,94,255,0.72)",
                    ],
                  }}
                  transition={{ duration: T.purple / 1000, ease: "easeOut" }}
                />

                <motion.div
                  className="jk-shockwave jk-shockwave-1"
                  initial={{ scale: 0.15, opacity: 0.95 }}
                  animate={{ scale: 9.2, opacity: 0 }}
                  transition={{ duration: T.purple / 1000, ease: "easeOut" }}
                />

                <motion.div
                  className="jk-shockwave jk-shockwave-2"
                  initial={{ scale: 0.15, opacity: 0.7 }}
                  animate={{ scale: 7.3, opacity: 0 }}
                  transition={{ duration: T.purple / 1000, ease: "easeOut", delay: 0.08 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === "video" && (
              <motion.div
                key="video"
                className="jk-video"
                initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  y: [0, -12, 0],
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  opacity: { duration: 0.62 },
                  y: { duration: 6.8, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.62 },
                }}
              >
                <div className="jk-video-shell">
                  <div className="jk-video-head">Hollow Purple</div>
                  <iframe
                    className="jk-video-frame"
                    src="https://www.youtube.com/embed/JTGNRJEptc0?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0"
                    title="Sukuna VS Gojo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
