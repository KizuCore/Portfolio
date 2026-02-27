import { JSX, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import video from "@media/secret.mp4";
import Particle from "../../utils/Particle";
import "../../assets/styles/Easter/Arcane/Arcane.css";

type ArcanePhase = "prelude" | "rewind" | "burst" | "reveal";

const TIMELINE = {
  prelude: 1500,
  rewind: 1800,
  burst: 820,
};

const SHARD_COUNT = 12;

function RouteSecret(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<ArcanePhase>("prelude");

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("reveal");
      return;
    }

    const preludeTimer = window.setTimeout(() => setPhase("rewind"), TIMELINE.prelude);
    const burstTimer = window.setTimeout(() => setPhase("burst"), TIMELINE.prelude + TIMELINE.rewind);
    const revealTimer = window.setTimeout(
      () => setPhase("reveal"),
      TIMELINE.prelude + TIMELINE.rewind + TIMELINE.burst
    );

    return () => {
      window.clearTimeout(preludeTimer);
      window.clearTimeout(burstTimer);
      window.clearTimeout(revealTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="arcane-route" aria-label="Powder and Ekko easter egg">
      <Particle />

      <Container fluid className="arcane-shell">
        <div className="arcane-bg" aria-hidden="true" />
        <div className="arcane-noise" aria-hidden="true" />
        <div className="arcane-vignette" aria-hidden="true" />

        <motion.div
          className="arcane-stage"
          animate={
            phase === "burst" && !prefersReducedMotion
              ? {
                  x: [0, -4, 4, -3, 2, 0],
                  y: [0, 2, -2, 1, -1, 0],
                  rotate: [0, -0.4, 0.35, -0.2, 0.1, 0],
                }
              : { x: 0, y: 0, rotate: 0 }
          }
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            {phase === "prelude" && (
              <motion.div
                key="prelude"
                className="arcane-prelude"
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="arcane-kicker">EASTER EGG</p>
                <h1 className="title-font-easter arcane-title">Powder &amp; Ekko</h1>
                <p className="arcane-subtitle">Rewind the moment. Rewrite the outcome.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(phase === "rewind" || phase === "burst") && (
              <motion.div
                key="rewind-scene"
                className="arcane-rewind-scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <div className="arcane-center-anchor">
                  <motion.div
                    className="arcane-character-card arcane-character-powder"
                    initial={{ x: "-42vw", y: 14, opacity: 0, rotate: -12 }}
                    animate={
                      phase === "rewind"
                        ? {
                            x: ["-42vw", "-19vw", "-16vw"],
                            y: [14, 6, 0],
                            opacity: [0, 1, 0.95],
                            rotate: [-12, -6, -4],
                            scale: [0.92, 1.04, 1],
                          }
                        : {
                            x: "-8vw",
                            y: -2,
                            opacity: 0.42,
                            rotate: -2,
                            scale: 0.96,
                          }
                    }
                    transition={{
                      duration: phase === "rewind" ? TIMELINE.rewind / 1000 : TIMELINE.burst / 1000,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="arcane-character-tag">Powder</span>
                  </motion.div>
                </div>

                <div className="arcane-center-anchor">
                  <motion.div
                    className="arcane-character-card arcane-character-ekko"
                    initial={{ x: "42vw", y: -14, opacity: 0, rotate: 12 }}
                    animate={
                      phase === "rewind"
                        ? {
                            x: ["42vw", "19vw", "16vw"],
                            y: [-14, -6, 0],
                            opacity: [0, 1, 0.95],
                            rotate: [12, 6, 4],
                            scale: [0.92, 1.04, 1],
                          }
                        : {
                            x: "8vw",
                            y: 2,
                            opacity: 0.42,
                            rotate: 2,
                            scale: 0.96,
                          }
                    }
                    transition={{
                      duration: phase === "rewind" ? TIMELINE.rewind / 1000 : TIMELINE.burst / 1000,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="arcane-character-tag">Ekko</span>
                  </motion.div>
                </div>

                <div className="arcane-center-anchor">
                  <motion.div
                    className="arcane-rewind-track"
                    initial={{ scaleX: 0.2, opacity: 0 }}
                    animate={
                      phase === "rewind"
                        ? { scaleX: 1, opacity: 0.95 }
                        : { scaleX: 0.7, opacity: 0.45 }
                    }
                    transition={{
                      duration: phase === "rewind" ? TIMELINE.rewind / 1000 : TIMELINE.burst / 1000,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                <div className="arcane-center-anchor">
                  <motion.div
                    className="arcane-time-gate"
                    initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                    animate={
                      phase === "rewind"
                        ? {
                            scale: [0.6, 1.08, 1],
                            opacity: [0, 1, 0.94],
                            rotate: [-12, 4, 0],
                          }
                        : {
                            scale: [1, 1.2, 0.78],
                            opacity: [0.94, 0.8, 0],
                            rotate: [0, 10, 18],
                          }
                    }
                    transition={{
                      duration: phase === "rewind" ? TIMELINE.rewind / 1000 : TIMELINE.burst / 1000,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="arcane-gate-symbol">REWIND</span>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {phase === "burst" && (
                    <motion.div
                      key="burst-layer"
                      className="arcane-burst-layer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="arcane-burst-flash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.32, ease: "easeOut" }}
                      />

                      <motion.div
                        className="arcane-burst-prism"
                        initial={{ scale: 0.2, opacity: 0.9, rotate: -12 }}
                        animate={{ scale: 5.9, opacity: 0, rotate: 20 }}
                        transition={{ duration: TIMELINE.burst / 1000, ease: "easeOut" }}
                      />

                      <motion.div
                        className="arcane-time-tear"
                        initial={{ scaleY: 0.1, opacity: 0.85 }}
                        animate={{ scaleY: 1.5, opacity: 0 }}
                        transition={{ duration: TIMELINE.burst / 1000, ease: "easeOut" }}
                      />

                      <div className="arcane-shards" aria-hidden="true">
                        {Array.from({ length: SHARD_COUNT }).map((_, index) => (
                          <motion.span
                            key={index}
                            className="arcane-shard"
                            style={{
                              rotate: `${(360 / SHARD_COUNT) * index}deg`,
                            }}
                            initial={{ scaleY: 0.2, opacity: 0.9 }}
                            animate={{ scaleY: 1.45, opacity: 0 }}
                            transition={{ duration: TIMELINE.burst / 1000, ease: "easeOut", delay: index * 0.018 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === "reveal" && (
              <motion.div
                key="reveal"
                className="arcane-video-wrap"
                initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.58, ease: "easeOut" }}
              >
                <div className="arcane-video-glow" aria-hidden="true" />

                <div className="arcane-video-frame">
                  <div className="arcane-video-head">
                    <span className="arcane-chip arcane-chip-powder">Powder</span>
                    <span className="arcane-chip arcane-chip-ekko">Ekko</span>
                  </div>

                  <video src={video} autoPlay controls playsInline className="arcane-video" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

export default RouteSecret;
