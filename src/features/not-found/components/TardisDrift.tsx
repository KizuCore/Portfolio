import "../styles/TardisDrift.css";

const FACES = ["front", "right", "back", "left"] as const;

export default function TardisDrift() {
  return <div className="not-found-flight" aria-hidden="true">
    <div className="not-found-traveller">
      <div className="tardis-404-ship">
        <div className="tardis-404-box">
          {FACES.map(face => <svg
            key={face}
            className={`tardis-404-face tardis-404-face-${face}`}
            viewBox="0 0 100 200"
            fill="none"
            focusable="false"
          >
            {/* Les faces remplissent leur plan jusqu’aux bords pour éviter les angles sombres. */}
            <path d="M0 15H100V200H0Z" fill={face === "front" ? "#24598e" : "#194673"} />
            <path d="M9 14V194M91 14V194M50 28V191" stroke="#497dac" strokeWidth="4" />
            <path d="M0 15H100V29H0Z" fill="#10253e" stroke="#6992b7" />
            <text x="50" y="24" textAnchor="middle" fill="#e3edf1" fontSize="7" fontFamily="Arial, sans-serif">POLICE BOX</text>
            {[16, 57].map(x => <g key={x}>
              <rect x={x} y="36" width="27" height="36" fill="#c3deeb" stroke="#8db2cc" />
              <path d={`M${x + 9} 36V72M${x + 18} 36V72M${x} 54H${x + 27}`} stroke="#315c82" strokeWidth="2" />
              {[82, 118, 154].map(y => <g key={y}>
                <rect x={x} y={y} width="27" height="28" fill="#143d69" stroke="#5182ac" />
                <path d={`M${x + 2} ${y + 26}V${y + 2}H${x + 25}`} stroke="#0c294a" />
              </g>)}
            </g>)}
            {face === "front" && <>
              <rect x="19" y="85" width="21" height="22" fill="#dce2de" />
              <path d="M22 90H37M24 94H35M23 98H36M25 102H34" stroke="#637a86" />
              <path d="M54 100V116" stroke="#bacbd3" strokeWidth="2" />
              <circle cx="59" cy="112" r="1.7" fill="#c8b787" />
            </>}
            <path d="M0 193H100V200H0Z" fill="#285682" stroke="#668fb5" />
          </svg>)}
          <span className="tardis-404-cap tardis-404-body-cap" />
          <span className="tardis-404-cap tardis-404-bottom" />
          {["roof-base", "roof-top", "lamp"].map(part => <span
            key={part}
            className={`tardis-404-solid tardis-404-${part}`}
          >
            {FACES.map(face => <span
              key={face}
              className={`tardis-404-solid-face tardis-404-solid-${face}`}
            />)}
            <span className="tardis-404-cap" />
          </span>)}
        </div>
      </div>
    </div>
  </div>;
}
