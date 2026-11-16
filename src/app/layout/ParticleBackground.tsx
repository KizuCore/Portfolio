import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import React from "react";
import type { DestroyType, ISourceOptions, MoveDirection } from "@tsparticles/engine";

type ParticlesComponent = typeof import("@tsparticles/react")["Particles"];
let particlesEnginePromise: Promise<ParticlesComponent> | null = null;

function isLimitedDevice() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4)
    || (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4)
    || window.matchMedia("(max-width: 1024px) and (min-resolution: 1.75dppx)").matches;
}

const BEACONS = [ [8, 19], [79, 12], [93, 62], [17, 79], [65, 86], [42, 7] ];

function ensureParticlesEngine() {
  if (!particlesEnginePromise) {
    // tsparticles doit être initialisé une fois avant l’affichage de toute instance Particles.
    particlesEnginePromise = Promise.all([
      import("@tsparticles/react"),
      import("@tsparticles/basic"),
    ]).then(async ([{ Particles, initParticlesEngine }, { loadBasic }]) => {
      // Le ciel utilise seulement les cercles, leur déplacement et leur opacité.
      await initParticlesEngine(loadBasic);
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
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 768px)").matches);
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
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const limitedQuery = window.matchMedia("(max-width: 1024px) and (min-resolution: 1.75dppx)");

    const updateViewport = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(mediaQuery.matches);
      setIsLowPerfDevice(isLimitedDevice());
    };

    // Les valeurs initiales sont déjà lues avant le montage. Ne force pas une
    // nouvelle mise en page juste après les écritures DOM du premier rendu.
    mobileQuery.addEventListener("change", updateViewport);
    limitedQuery.addEventListener("change", updateViewport);
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mobileQuery.removeEventListener("change", updateViewport);
      limitedQuery.removeEventListener("change", updateViewport);
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  const particleOptions = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      // Le déplacement très lent des étoiles reste fluide à 24 images par seconde.
      fpsLimit: 24,
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
      <div className="sky-distant-stars" />
      <div className="sky-beacons">{BEACONS.map(([x, y], index) => <i key={index} style={{ left: `${x}%`, top: `${y}%`, "--star-delay": `${-index * 2.7}s` } as CSSProperties} />)}</div>
      {!isMobile && !isLowPerfDevice && !prefersReducedMotion && <div className="sky-meteors"><i /><i /></div>}
      {Particles && animateParticles ? <Particles id={`particles-${particleId}`} options={particleOptions} /> : null}
    </div>
  );
}

export default React.memo(ParticleBackground);
