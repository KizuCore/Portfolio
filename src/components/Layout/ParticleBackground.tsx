import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import React from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { DestroyType, ISourceOptions, MoveDirection } from "@tsparticles/engine";

let particlesEnginePromise: Promise<void> | null = null;

// Des positions stables empêchent le ciel de se déplacer brusquement entre les rendus et les pages.
const DISTANT_STARS = Array.from({ length: 100 }, (_, index) => {
  const x = ((index * 0.61803398875 + 0.13) % 1) * 100;
  const y = ((index * index * 0.41421356 + 0.07) % 1) * 100;
  return `radial-gradient(circle at ${x.toFixed(2)}% ${y.toFixed(2)}%, rgba(186,210,247,${index % 4 === 0 ? .5 : .23}) 0 ${index % 5 === 0 ? .9 : .55}px, transparent 1.3px)`;
}).join(",");
const BEACONS = [ [8, 19], [79, 12], [93, 62], [17, 79], [65, 86], [42, 7] ];

function ensureParticlesEngine() {
  if (!particlesEnginePromise) {
    // tsparticles doit être initialisé une fois avant l’affichage de toute instance Particles.
    particlesEnginePromise = initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }

  return particlesEnginePromise;
}

function ParticleBackground() {
  const particleId = useId().replace(/:/g, "-");
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
  const [isHidden, setIsHidden] = useState(document.hidden);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    let mounted = true;

    ensureParticlesEngine().then(() => {
      if (mounted) {
        setIsReady(true);
      }
    }).catch(() => { /* Le champ d’étoiles statique reste visible si le moteur échoue. */ });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const visibility = () => setIsHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { deviceMemory?: number };

    const computePerfProfile = () => {
      // Combine la mémoire, les fils d’exécution du processeur, la densité de pixels et la taille de la fenêtre dans un profil de performances léger.
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
      // Réduit les mouvements et la fréquence d’affichage sur les appareils limités pour garder le portfolio réactif.
      fpsLimit: prefersReducedMotion ? 1 : isLowPerfDevice ? 24 : 40,
      detectRetina: !isLowPerfDevice,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        number: {
          value: isMobile ? 24 : isLowPerfDevice ? 32 : 65,
          density: {
            enable: true,
            area: 1100,
          },
        },
        links: {
          enable: false,
        },
        move: {
          enable: !prefersReducedMotion,
          direction: "none" as MoveDirection,
          speed: isLowPerfDevice ? 0.06 : 0.09,
          outModes: { default: "out" },
        },
        size: {
          value: { min: 0.45, max: 1.65 },
        },
        opacity: {
          value: { min: 0.15, max: 0.65 },
          animation: {
            enable: !isLowPerfDevice && !prefersReducedMotion,
            speed: 0.22,
            startValue: "random",
            destroy: "none" as DestroyType,
            sync: false,
          },
        },
        color: {
          value: ["#f5fbff", "#cfe4ff", "#9dccff", "#eedbc6"],
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
    [isLowPerfDevice, isMobile, prefersReducedMotion]
  );

  if (typeof document === "undefined") {
    return null;
  }

  // Reste dans le contexte d’empilement de l’application, sous le contenu et au-dessus du dégradé de fond.
  return (
    <div
      className={`particles-layer ${isReady ? "particles-layer--ready" : "particles-layer--loading"}`}
      data-sky-motion={!prefersReducedMotion && !isLowPerfDevice}
      data-sky-paused={isHidden}
      aria-hidden="true"
    >
      <div className="sky-nebula" />
      <div className="sky-distant-stars" style={{ backgroundImage: DISTANT_STARS }} />
      <div className="sky-beacons">{BEACONS.map(([x, y], index) => <i key={index} style={{ left: `${x}%`, top: `${y}%`, "--star-delay": `${-index * 2.7}s` } as CSSProperties} />)}</div>
      {!isMobile && !isLowPerfDevice && !prefersReducedMotion && <div className="sky-meteors"><i /><i /></div>}
      {isReady ? <Particles id={`particles-${particleId}`} options={particleOptions} /> : null}
    </div>
  );
}

export default React.memo(ParticleBackground);
