import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function MinecraftMemory() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [mined, setMined] = useState(false);
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    if (!mined) return;
    const timer = window.setTimeout(() => setMined(false), 1300);
    return () => window.clearTimeout(timer);
  }, [mined, burst]);
  return <span className="profile-minecraft">
    <button type="button" className="profile-inline-trigger minecraft-trigger" onClick={() => { setMined(true); setBurst(value => value + 1); }} aria-label={t("about_interactions.mine_label")}>
      <strong>{t("presentation.minecraft_label")}</strong>
      <span className="minecraft-icon" aria-hidden="true">
        <span className={`minecraft-block ${mined ? "is-mined" : ""}`}><i /></span>
        {mined && !reduced && <span className="minecraft-particles" key={burst}>{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--dx": `${Math.cos(index * Math.PI / 6) * (35 + index % 3 * 10)}px`, "--dy": `${Math.sin(index * Math.PI / 6) * 42 - 18}px`, "--turn": `${index * 55}deg` } as CSSProperties} />)}</span>}
      </span>
    </button>
    <span className="visually-hidden" role="status">{mined ? t("about_interactions.mined") : ""}</span>
  </span>;
}
