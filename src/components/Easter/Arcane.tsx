import { JSX, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Utils/Particle";
import { motion } from "framer-motion";
import video from "@media/secret.mp4";
import WavyText from "./WayText";

function RouteSecret(): JSX.Element {
  const [preloading, setPreloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <Container fluid className="about-section pt-0" id="home">
        <Particle />

        <Container className="d-flex justify-content-center align-items-center vh-100">
          {preloading ? (
            <div
              className="preload-message title-font-easter"
              style={{ fontSize: "2.2em" }}
            >
              <WavyText text="Powder & Ekko..." />

            </div>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.3,
                rotate: 720,
                filter: "blur(20px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [0, -10, 0],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                type: "tween",
              }}
            >
              <motion.div
                initial={{ filter: "blur(20px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <video
                  src={video}
                  autoPlay
                  controls
                  playsInline
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "16/9",
                    borderRadius: "12px",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </Container>
      </Container>
    </section>
  );
}

export default RouteSecret;
