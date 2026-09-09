import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import flag from "../../assets/images/flags/flag_bzh.svg";
import "../../assets/styles/Easter/BretonTakeover.css";

const CONFETTI = Array.from({ length: 42 }, (_, index) => index);

type Props = { language: string; onComplete: () => void };

export default function BretonTakeover({ language, onComplete }: Props) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  // Keep the joke in the visitor's previous language while the page switches to Breton.
  const text = (key: string) => t(`easter.breton.${key}`, { lng: language });

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), reducedMotion ? 0 : 1600),
      window.setTimeout(() => setStage(2), reducedMotion ? 0 : 3200),
      window.setTimeout(onComplete, 8000),
    ];
    const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") onComplete(); };
    window.addEventListener("keydown", dismiss);
    return () => { timers.forEach(window.clearTimeout); window.removeEventListener("keydown", dismiss); };
  }, [onComplete, reducedMotion]);

  return createPortal(
    <aside className="bzh-takeover" data-stage={stage} aria-label={text("label")}>
      <div className="bzh-curtain" aria-hidden="true" />
      {!reducedMotion && <div className="bzh-confetti" aria-hidden="true">{CONFETTI.map(index => <i key={index} style={{ "--i": index, "--drift": `${(index % 2 ? 1 : -1) * (35 + index % 6 * 20)}px`, left: `${(index * 31 + 7) % 100}%` } as CSSProperties} />)}</div>}
      <div className="bzh-ticket">
        <div className="bzh-ticket-top"><span>PRÉFECTURE DU BEURRE SALÉ</span><span>N° 29·56</span></div>
        <div className="bzh-flag-scene" aria-hidden="true">
          <div className="bzh-flagpole" />
          <div className="bzh-flag"><img src={flag} alt="" /><div className="bzh-fabric" /></div>
          <span className="bzh-flag-caption">GWENN HA DU / 100% PUR BREIZH</span>
        </div>
        <p className="bzh-overline">{text("detected")}</p>
        <h2>{text("title")}<span>{text("territory")}</span></h2>
        <div className="bzh-diagnostics" role="status">
          <p><span aria-hidden="true">{stage >= 1 ? '✓' : '…'}</span>{text(stage >= 1 ? "butter_fixed" : "butter")}</p>
          <p><span aria-hidden="true">{stage >= 2 ? '✓' : '…'}</span>{text(stage >= 2 ? "weather_fixed" : "weather")}</p>
        </div>
        <div className="bzh-stamp" aria-hidden="true"><span>BREIZH</span><strong>APPROVED</strong><small>BEURRE SALÉ ONLY</small></div>
        <p className="bzh-punchline">{text("punchline")}</p>
        <div className="bzh-ticket-bottom"><span>BREIZH ATAO ♥</span><span>{text("exit")}</span></div>
        <div className="bzh-duration" aria-hidden="true" />
      </div>
    </aside>,
    document.body
  );
}
