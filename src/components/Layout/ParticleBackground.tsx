import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import React from "react";
import type { DestroyType, ISourceOptions, MoveDirection } from "@tsparticles/engine";

type ParticlesComponent = typeof import("@tsparticles/react")["Particles"];
let particlesEnginePromise: Promise<ParticlesComponent> | null = null;

function isLimitedDevice() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4)
    || (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4)
    || (window.innerWidth <= 1024 && window.devicePixelRatio > 1.75);
}

// Des positions stables empêchent le ciel de se déplacer brusquement entre les rendus et les pages.
const skyNoise = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};
const DISTANT_STARS = Array.from({ length: 160 }, (_, index) => {
  const x = skyNoise(index + 1) * 100;
  const y = skyNoise(index + 201) * 100;
  const radius = 0.35 + Math.pow(skyNoise(index + 401), 3) * 0.95;
  const opacity = 0.14 + skyNoise(index + 601) * 0.44;
  const color = index % 11 === 0 ? "239,221,196" : index % 3 === 0 ? "232,240,255" : "174,199,235";
  return `radial-gradient(circle at ${x.toFixed(2)}% ${y.toFixed(2)}%, rgba(${color},${opacity.toFixed(2)}) 0 ${radius.toFixed(2)}px, transparent ${(radius + 0.65).toFixed(2)}px)`;
}).join(",");
const BEACONS = [ [8, 19], [79, 12], [93, 62], [17, 79], [65, 86], [42, 7] ];

function ensureParticlesEngine() {
  if (!particlesEnginePromise) {
    // tsparticles doit être initialisé une fois avant l’affichage de toute instance Particles.
    particlesEnginePromise = Promise.all([
      import("@tsparticles/react"),
      import("tsparticles"),
    ]).then(async ([{ Particles, initParticlesEngine }, { loadFull }]) => {
      await initParticlesEngine(loadFull);
      return Particles;
    }).catch((error: unknown) => {
      particlesEnginePromise = null;
      throw error;
    });
  }

  return particlesEnginePromise;
}

function ParticleBackground() {
  const particleId = useId().replace(/:/g, "-");
  const [Particles, setParticles] = useState<ParticlesComponent | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(isLimitedDevice);
  const [isHidden, setIsHidden] = useState(document.hidden);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const animateParticles = !isMobile && !isLowPerfDevice && !prefersReducedMotion;

  useEffect(() => {
    if (!animateParticles) return;
    let mounted = true;
    let idleId: number | undefined;
    let timerId: number | undefined;

    const load = () => {
      void ensureParticlesEngine().then((component) => {
        if (mounted) setParticles(() => component);
      }).catch(() => { /* Le ciel statique reste visible si le moteur échoue. */ });
    };
    // Le décor animé ne concurrence ni le rendu initial ni les ressources de la page.
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(load, { timeout: 2000 });
      } else {
        timerId = window.setTimeout(load, 1000);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      mounted = false;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [animateParticles]);

  useEffect(() => {
    const visibility = () => setIsHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateViewport = () => {
      setIsMobile(window.innerWidth <= 768);
      setPrefersReducedMotion(mediaQuery.matches);
      setIsLowPerfDevice(isLimitedDevice());
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
          value: isMobile ? 16 : isLowPerfDevice ? 24 : 38,
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
          speed: isLowPerfDevice ? 0.025 : 0.04,
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
      className={`particles-layer ${Particles || !animateParticles ? "particles-layer--ready" : "particles-layer--loading"}`}
      data-sky-motion={animateParticles}
      data-sky-paused={isHidden}
      aria-hidden="true"
    >
      <div className="sky-nebula" />
      <div className="sky-distant-stars" style={{ backgroundImage: DISTANT_STARS }} />
      <div className="sky-beacons">{BEACONS.map(([x, y], index) => <i key={index} style={{ left: `${x}%`, top: `${y}%`, "--star-delay": `${-index * 2.7}s` } as CSSProperties} />)}</div>
      {!isMobile && !isLowPerfDevice && !prefersReducedMotion && <div className="sky-meteors"><i /><i /></div>}
      {Particles && animateParticles ? <Particles id={`particles-${particleId}`} options={particleOptions} /> : null}
    </div>
  );
}

export default React.memo(ParticleBackground);
