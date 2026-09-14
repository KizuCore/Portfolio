import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getLocalizedPath, getShortLocale } from "../../config/seo";
import video from "@media/secret.mp4";
import "../../assets/styles/Easter/Arcane/Arcane.css";

const PHASES = ["spark", "fracture", "rewind", "bloom", "reveal"] as const;
const CUES = [0, 2200, 3400, 7400, 9200];
const MARKS = Array.from({ length: 60 }, (_, index) => index);
const FRAGMENTS = Array.from({ length: 24 }, (_, index) => index);

export default function RouteSecret() {
  const { t, i18n } = useTranslation();
  const reducedMotion = useReducedMotion();
  const scene = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [seconds, setSeconds] = useState(4);
  const complete = !!reducedMotion || stage === 4;
  const phase = complete ? "reveal" : PHASES[stage];

  useEffect(() => {
    if (reducedMotion) return;
    let elapsed = 0;
    let previous = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      if (!document.hidden) elapsed += Math.min(now - previous, 100);
      previous = now;
      const next = CUES.reduce((value, cue, index) => elapsed >= cue ? index : value, 0);
      setStage(current => current === next ? current : next);
      const rewind = Math.max(0, Math.min(1, (elapsed - 3400) / 4000));
      setSeconds(Math.ceil(4 * (1 - rewind)));
      scene.current?.style.setProperty("--hand", `${elapsed < 3400 ? elapsed * 0.06 : 204 - rewind * 1440}deg`);
      scene.current?.style.setProperty("--rewind", String(rewind));
      if (next < 4) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return (
    <section className="arcane-route" data-phase={phase} aria-label={t("easter.arcane.aria_label")}>
      <div className="arcane-world" ref={scene}>
        <div className="arcane-paper" aria-hidden="true" />
        <div className="arcane-aura" aria-hidden="true" />
        <header className="arcane-topline">
          <Link to={getLocalizedPath(getShortLocale(i18n.resolvedLanguage ?? i18n.language), "/")}><span aria-hidden="true">↖</span> {t("easter.arcane.back")}</Link>
          <span>ZAUN <i aria-hidden="true">✦</i> {t("easter.arcane.archive")}</span>
          <span className="arcane-file">Z / 04</span>
        </header>

        {!complete ? (
          <>
            <div className="arcane-fireflies" aria-hidden="true">
              {FRAGMENTS.map(index => <i key={index} style={{ "--i": index, left: `${(index * 37 + 9) % 100}%`, top: `${20 + (index * 19) % 62}%` } as CSSProperties} />)}
            </div>
            <div className="arcane-inscription arcane-inscription-left" aria-hidden="true"><span>01 / {t("easter.arcane.ekko")}</span><b>{t("easter.arcane.time")}</b></div>
            <div className="arcane-inscription arcane-inscription-right" aria-hidden="true"><span>02 / {t("easter.arcane.powder")}</span><b>{t("easter.arcane.memory")}</b></div>
            <div className="arcane-machine" aria-hidden="true">
              <svg className="arcane-dial" viewBox="0 0 500 500" fill="none">
                <circle cx="250" cy="250" r="238" className="arcane-fine-ring" />
                <circle cx="250" cy="250" r="219" className="arcane-brass-ring" />
                <circle cx="250" cy="250" r="194" className="arcane-fine-ring" />
                {MARKS.map(index => <path key={index} d={`M250 ${index % 5 === 0 ? 37 : 42} V${index % 5 === 0 ? 59 : 50}`} transform={`rotate(${index * 6} 250 250)`} className={index % 5 === 0 ? "arcane-major-tick" : "arcane-minor-tick"} />)}
                <g className="arcane-inner-dial"><circle cx="250" cy="250" r="161" /><path d="M250 89 389 330 111 330Z M250 411 111 170 389 170Z" /><circle cx="250" cy="250" r="120" /></g>
                <g className="arcane-hand"><path d="M250 250V75 M244 100 250 75 256 100" /><circle cx="250" cy="75" r="4" /></g>
                <g className="arcane-second-hand"><path d="M250 280V108" /></g>
                <path className="arcane-hourglass" d="M215 209H285L220 291H280ZM220 209 280 291M215 291H285" />
                <circle className="arcane-progress-ring" cx="250" cy="250" r="230" pathLength="1" />
              </svg>
              <div className="arcane-crystal" />
              <div className="arcane-fragments">{FRAGMENTS.map(index => <i key={index} style={{ "--i": index, "--angle": `${index * 15}deg`, "--reach": `${135 + (index % 4) * 25}px` } as CSSProperties} />)}</div>
              <div className="arcane-rift" />
              <div className="arcane-count"><strong>{String(seconds).padStart(2, "0")}</strong><span>{t("easter.arcane.seconds")}</span></div>
            </div>
            <div className="arcane-intro">
              <p className="arcane-eyebrow">{t("easter.arcane.experiment")}</p>
              <h1>{t("easter.arcane.ekko")} <em>&</em> {t("easter.arcane.powder")}</h1>
              <p className="arcane-subtitle">{t("easter.arcane.subtitle")}</p>
            </div>
            <div className="arcane-bloom-title" aria-hidden="true"><span>{t("easter.arcane.another")}</span><strong>{t("easter.arcane.chance")}</strong></div>
          </>
        ) : (
          <div className="arcane-reveal">
            <p className="arcane-eyebrow">{t("easter.arcane.found")}</p>
            <h1>{t("easter.arcane.ekko")} <em>&</em> {t("easter.arcane.powder")}</h1>
            <p className="arcane-subtitle">{t("easter.arcane.result")}</p>
            <div className="arcane-film">
              <div className="arcane-film-header"><span>{t("easter.arcane.memory")}</span><span>∞ / 04</span></div>
              <video src={video} autoPlay={!reducedMotion} muted controls playsInline preload="metadata" aria-label={t("easter.arcane.video_label")} />
            </div>
          </div>
        )}

        <footer className="arcane-console">
          <div role="status"><span className="arcane-eyebrow">{t("easter.arcane.device")}</span><strong>{t(`easter.arcane.phases.${phase}`)}</strong></div>
          <div className="arcane-timeline" aria-hidden="true">{[4, 3, 2, 1, 0].map(value => <span key={value} className={complete || seconds <= value ? "is-lit" : ""}><i />{String(value).padStart(2, "0")}</span>)}</div>
          <span className="arcane-console-note">{t("easter.arcane.limit")}</span>
        </footer>
      </div>
    </section>
  );
}
