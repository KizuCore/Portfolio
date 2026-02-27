import { useEffect, useId, useMemo, useState } from "react";
import React from "react";
import { createPortal } from "react-dom";
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
          value: isMobile ? 50 : 105,
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
          value: { min: 0.85, max: 2.35 },
        },
        opacity: {
          value: { min: 0.28, max: 0.82 },
          animation: {
            enable: true,
            speed: 0.45,
            startValue: "random",
            destroy: "none" as DestroyType,
            sync: false,
          },
        },
        color: {
          value: ["#f5fbff", "#cfe4ff", "#9dccff"],
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

  if (!isReady || prefersReducedMotion || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="particles-layer" aria-hidden="true">
      <Particles id={`particles-${particleId}`} options={particleOptions} />
    </div>,
    document.body
  );
}

export default React.memo(Particle);
