import { useEffect, useState } from "react";
import { Particles } from "@tsparticles/react";
import type { MoveDirection, DestroyType } from "@tsparticles/engine";
import React from "react";

function Particle() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const particleOptions = {
    particles: {
      number: {
        value: isMobile ? 200 : 500,
        density: {
          enable: true,
          area: 1000,
        },
      },
      links: {
        enable: false,
        opacity: 0.02,
      },
      move: {
        direction: "right" as MoveDirection,
        speed: 0.05,
      },
      size: {
        value: 1,
      },
      opacity: {
        value: { min: 0.05, max: 1 },
        animation: {
          enable: true,
          speed: 1.5,
          startValue: "random" as const,
          destroy: "none" as DestroyType,
          sync: false,
        },
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        push: {
          quantity: 1,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div aria-hidden="true">
      <Particles id="tsparticles" options={particleOptions} />
    </div>
  );
}

export default React.memo(Particle);
