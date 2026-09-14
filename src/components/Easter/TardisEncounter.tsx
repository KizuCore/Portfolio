import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Easter/TardisEncounter.css";

export default function TardisEncounter({ beat, reducedMotion }: { beat: number; reducedMotion: boolean }) {
  const { t } = useTranslation();
  const phase = reducedMotion ? "landed" : beat < 7 ? "arrival" : beat < 20 ? "landed" : "departure";
  return createPortal(
    <aside className="tardis-encounter" data-phase={phase} aria-label={t("easter.tardis.label")}>
      <div className="tardis-space" aria-hidden="true" />
      <div className="tardis-vortex" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="tardis-scene" aria-hidden="true">
        <div className="tardis-shadow" />
        <div className="tardis-ship">
          <div className="tardis-beacon-glow" />
          <svg viewBox="0 0 260 430" className="tardis-box" fill="none">
            <path d="M43 108 61 80H205L230 108Z" fill="#153c77" stroke="#588fd3" />
            <path d="M64 80 82 62H187L205 80Z" fill="#1d4a8a" stroke="#70a0d8" />
            <path d="M118 61V33H146V61" fill="#d3f2ff" stroke="#4f82bc" strokeWidth="4" />
            <path d="M115 31 122 24H143L150 31Z" fill="#254b76" />
            <path d="M132 24V17" stroke="#74a6d8" strokeWidth="3" />
            <path d="M48 113H222V400H48Z" fill="#164b90" stroke="#6396ce" strokeWidth="2" />
            <path d="M222 113 241 128V397L222 400Z" fill="#0c2855" stroke="#244a78" />
            <path d="M40 104H231V140H40Z" fill="#214f89" stroke="#80a2c6" strokeWidth="2" />
            <path d="M49 112H222V132H49Z" fill="#080f1d" />
            <text x="135" y="126" textAnchor="middle" fill="#e4eff6" fontSize="11" fontFamily="Arial, sans-serif" letterSpacing="1">POLICE PUBLIC CALL BOX</text>
            <path d="M54 145H128V391H54ZM139 145H215V391H139Z" fill="#123d7b" stroke="#487eb5" strokeWidth="3" />
            {[62, 147].map(x => <g key={x}>
              <path d={`M${x} 155H${x + 59}V213H${x}Z`} fill="#a7d6e1" stroke="#81afcc" strokeWidth="2" />
              <path d={`M${x + 20} 155V213M${x + 40} 155V213M${x} 184H${x + 59}`} stroke="#244f80" strokeWidth="3" />
              {[225, 280, 335].map(y => <path key={y} d={`M${x} ${y}H${x + 59}V${y + 43}H${x}Z`} fill="#10366d" stroke="#4879aa" strokeWidth="2" />)}
            </g>)}
            <path d="M68 230H111V266H68Z" fill="#e2e3d8" />
            <text x="89" y="242" textAnchor="middle" fill="#243344" fontFamily="serif" fontSize="5">POLICE TELEPHONE</text>
            <path d="M75 248H104M78 253H101M80 258H99" stroke="#63717b" />
            <path d="M125 255V275" stroke="#b2c5ce" strokeWidth="3" />
            <circle cx="149" cy="261" r="3" fill="#c1ad72" />
            <path d="M41 399H232L240 412H32Z" fill="#234e81" stroke="#699aca" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="tardis-message" role="status">
        <p className="tardis-kicker">{t(`easter.tardis.${phase}`)}</p>
        <h2>{t("easter.tardis.title")}</h2>
        <p className="tardis-joke">{t("easter.tardis.joke")}</p>
        <span className="tardis-coordinate" aria-hidden="true">{reducedMotion ? '3000' : [2026, 1963, 3000, 1888, 2005][beat % 5]} / GALLIFREY STANDARD TIME</span>
      </div>
    </aside>, document.body
  );
}
