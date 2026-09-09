import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getLocalizedPath, getShortLocale } from "../../config/seo";
import GojoEnergy from "./GojoEnergy";
import "../../assets/styles/Easter/Gojo/Gojo.css";

const STAGES = ["awakening", "duality", "convergence", "purple", "complete"] as const;
const CUES = [0, 2400, 5500, 7900, 11200];

export default function GojoCursedTechnique() {
  const { t, i18n } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const elapsed = useRef(0);
  const complete = !!reducedMotion || stage === 4;
  const phase = complete ? "complete" : STAGES[stage];

  useEffect(() => {
    elapsed.current = 0;
    if (reducedMotion) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      // Hidden tabs pause the sequence instead of skipping its climax.
      if (!document.hidden) elapsed.current += Math.min(now - previous, 100);
      previous = now;
      const next = CUES.reduce((current, cue, index) => elapsed.current >= cue ? index : current, 0);
      setStage(current => current === next ? current : next);
      if (next < 4) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return (
    <section className="gojo-route" data-phase={phase} aria-label={t("easter.gojo.aria_label")}>
      <div className="gojo-observatory">
        <GojoEnergy elapsed={elapsed} complete={complete} reducedMotion={!!reducedMotion} />
        <div className="gojo-grain" aria-hidden="true" />
        <div className="gojo-grid" aria-hidden="true" />
        <header className="gojo-topline">
          <Link to={getLocalizedPath(getShortLocale(i18n.resolvedLanguage ?? i18n.language), "/")} className="gojo-back">
            <span aria-hidden="true">↖</span> {t("easter.gojo.back")}
          </Link>
          <span className="gojo-classification"><i /> {t("easter.gojo.classification")}</span>
          <span className="gojo-file">FILE / 006</span>
        </header>

        <div className="gojo-watermark" aria-hidden="true">無限</div>
        <div className="gojo-orbit gojo-orbit-one" aria-hidden="true" />
        <div className="gojo-orbit gojo-orbit-two" aria-hidden="true" />

        {!complete ? (
          <>
            <div className="gojo-intro">
              <p className="gojo-eyebrow">{t("easter.gojo.kicker")} / 五条悟</p>
              <h1>SATORU <span>GOJO</span></h1>
              <p className="gojo-quote">{t("easter.gojo.quote")}</p>
            </div>
            <div className="gojo-eye" aria-hidden="true"><div /></div>
            <div className="gojo-technique gojo-technique-blue" aria-hidden="true"><b>蒼</b><span>{t("easter.gojo.blue")}</span><small>−∞</small></div>
            <div className="gojo-technique gojo-technique-red" aria-hidden="true"><b>赫</b><span>{t("easter.gojo.red")}</span><small>+∞</small></div>
            <div className="gojo-climax" aria-hidden="true"><span>虚式</span><strong>茈</strong><p>HOLLOW PURPLE</p></div>
          </>
        ) : (
          <div className="gojo-result">
            <p className="gojo-eyebrow">{t("easter.gojo.unlocked")}</p>
            <h1>HOLLOW <span>PURPLE</span></h1>
            <p className="gojo-result-caption">{t("easter.gojo.result")}</p>
            <div className="gojo-video-shell">
              {playing ? (
                <iframe src="https://www.youtube-nocookie.com/embed/JTGNRJEptc0?autoplay=1&rel=0" title="Sukuna VS Gojo" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              ) : (
                <button className="gojo-play" onClick={() => setPlaying(true)}>
                  <span className="gojo-video-kanji" aria-hidden="true">茈</span>
                  <span className="gojo-play-icon" aria-hidden="true">▶</span>
                  <span>{t("easter.gojo.watch")}<small>GOJO × SUKUNA</small></span>
                </button>
              )}
            </div>
          </div>
        )}

        <footer className="gojo-console">
          <div className="gojo-status" role="status"><span className="gojo-eyebrow">{t("easter.gojo.output")}</span><strong>{t(`easter.gojo.phases.${phase}`)}</strong></div>
          <div className="gojo-steps" aria-hidden="true">{STAGES.slice(0, 4).map((name, index) => <span key={name} className={complete || stage >= index ? "is-active" : ""}><i />0{index + 1}</span>)}</div>
          <span className="gojo-signature">LIMITLESS / &infin;</span>
        </footer>
      </div>
    </section>
  );
}
