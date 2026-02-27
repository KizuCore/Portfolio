import { useEffect, useId, useMemo, useState } from "react";
import React from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { DestroyType, ISourceOptions, MoveDirection } from "@tsparticles/engine";

let particlesEnginePromise: Promise<void> | null = null;

function ensureParticlesEngine() {
  if (!particlesEnginePromise) {
    particlesEnginePromise = initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }

  return particlesEnginePromise;
}

function Particle() {
  const particleId = useId().replace(/:/g, "-");
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    let mounted = true;

    ensureParticlesEngine().then(() => {
      if (mounted) {
        setIsReady(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateViewport = () => {
      setIsMobile(window.innerWidth <= 768);
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  const particleOptions = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: isMobile ? 45 : 95,
          density: {
            enable: true,
            area: 1100,
          },
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none" as MoveDirection,
          speed: 0.16,
          outModes: { default: "out" },
        },
        size: {
          value: { min: 0.8, max: 2.2 },
        },
        opacity: {
          value: { min: 0.15, max: 0.55 },
          animation: {
            enable: true,
            speed: 0.4,
            startValue: "random",
            destroy: "none" as DestroyType,
            sync: false,
          },
        },
        color: {
          value: ["#7cc6ff", "#3f8cff", "#c5deff"],
        },
      },
      interactivity: {
        events: {
          onClick: { enable: false, mode: "push" },
          onHover: { enable: false, mode: "repulse" },
          resize: {
            enable: true,
          },
        },
      },
    }),
    [isMobile]
  );

  if (!isReady || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="particles-layer" aria-hidden="true">
      <Particles id={`particles-${particleId}`} options={particleOptions} />
    </div>
  );
}

export default React.memo(Particle);
