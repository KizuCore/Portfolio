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
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
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
    const nav = navigator as Navigator & { deviceMemory?: number };

    const computePerfProfile = () => {
      const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
      const lowThreads = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
      const highDpi = window.devicePixelRatio > 1.75;

      setIsLowPerfDevice(lowMemory || lowThreads || (window.innerWidth <= 1024 && highDpi));
    };

    const updateViewport = () => {
      setIsMobile(window.innerWidth <= 768);
      setPrefersReducedMotion(mediaQuery.matches);
      computePerfProfile();
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
      fpsLimit: isLowPerfDevice ? 36 : 48,
      detectRetina: !isLowPerfDevice,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        number: {
          value: isMobile ? 22 : isLowPerfDevice ? 34 : 56,
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
          speed: isLowPerfDevice ? 0.12 : 0.15,
          outModes: { default: "out" },
        },
        size: {
          value: { min: 0.8, max: 2.1 },
        },
        opacity: {
          value: { min: 0.28, max: 0.82 },
          animation: {
            enable: !isLowPerfDevice,
            speed: 0.4,
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
    [isLowPerfDevice, isMobile]
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
