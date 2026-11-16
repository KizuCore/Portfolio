import { useId } from "react";

export default function TardisDrift() {
  const id = useId().replace(/:/g, "");
  return <div className="not-found-flight" aria-hidden="true">
    <div className="not-found-traveller"><div className="tardis-404-ship">
      <svg viewBox="0 0 160 250" className="tardis-404-box" fill="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-front`} x1="28" y1="66" x2="117" y2="225" gradientUnits="userSpaceOnUse">
            <stop stopColor="#336fae" /><stop offset=".55" stopColor="#1b4b83" /><stop offset="1" stopColor="#10315a" />
          </linearGradient>
          <linearGradient id={`${id}-side`}><stop stopColor="#163c6a" /><stop offset="1" stopColor="#091b34" /></linearGradient>
          <linearGradient id={`${id}-glass`} x2=".8" y2="1"><stop stopColor="#f2f1d9" /><stop offset=".5" stopColor="#c3deeb" /><stop offset="1" stopColor="#87b7d6" /></linearGradient>
        </defs>
        <path d="M29 64 47 46H119L136 52 113 66Z" fill="#31649a" stroke="#8db3d9" strokeOpacity=".4" />
        <path d="M43 48 56 37H108L121 44 112 49Z" fill="#467cab" />
        <path d="M56 37 67 32H99L108 37Z" fill="#5c8db5" />
        <g className="tardis-404-lamp">
          <path d="M75 31V18H88V32" fill="#d4f1ff" stroke="#7eaccd" />
          <path d="M73 18 77 13H87L91 18Z" fill="#4c7396" />
          <path d="M81 18V30M86 18V31" stroke="#6a99bc" strokeWidth="1.3" />
        </g>
        <path d="M112 65 136 52V210L112 224Z" fill={`url(#${id}-side)`} stroke="#4573a0" />
        <path d="M29 66H112V224H29Z" fill={`url(#${id}-front)`} stroke="#679ac5" />
        <path d="M25 61H115V81H25Z" fill="#244f7e" stroke="#6b98c0" />
        <path d="M115 61 139 48V68L115 81Z" fill="#132c4a" stroke="#406388" />
        <path d="M31 65H109V76H31Z" fill="#071424" />
        <text x="70" y="72.7" textAnchor="middle" fill="#e3edf1" fontSize="5.8" fontFamily="Arial, sans-serif" letterSpacing=".45">POLICE PUBLIC CALL BOX</text>
        <path d="M119 63 133 55V63L119 71Z" fill="#081627" />
        <path d="M30 83H36V221H30ZM106 83H112V222H106Z" fill="#3e72a4" />
        <path d="M70 82V221" stroke="#081e39" strokeWidth="2" />
        {[40, 76].map(x => <g key={x}>
          <rect x={x} y="88" width="26" height="35" rx=".5" fill={`url(#${id}-glass)`} stroke="#8db2cc" />
          <path d={`M${x + 9} 88V123M${x + 17} 88V123M${x} 105H${x + 26}`} stroke="#315c82" strokeWidth="2" />
          {[131, 160, 189].map(y => <g key={y}>
            <path d={`M${x} ${y}H${x + 26}V${y + 23}H${x}Z`} fill="#143d69" stroke="#5182ac" strokeWidth=".8" />
            <path d={`M${x + 2} ${y + 21}V${y + 2}H${x + 24}`} stroke="#0c294a" strokeWidth="1.2" />
          </g>)}
        </g>)}
        <path d="m119 85 11-6v31l-11 6Z" fill="#84abc1" fillOpacity=".65" stroke="#396086" />
        <path d="m124 82v31m-5-12 11-6" stroke="#183852" strokeWidth="2" />
        <path d="m119 130 11-6v23l-11 6Zm0 30 11-6v23l-11 6Zm0 30 11-6v20l-11 6Z" fill="#0b2442" stroke="#2a5279" />
        <rect x="43" y="134" width="20" height="18" rx=".6" fill="#dce2de" />
        <path d="M46 138H60M48 141H58M47 144H59M49 147H57" stroke="#637a86" strokeWidth=".8" />
        <path d="M73 144V156" stroke="#bacbd3" strokeWidth="2" strokeLinecap="round" />
        <circle cx="78" cy="150" r="1.6" fill="#c8b787" />
        <path d="M24 224H115L121 233H18Z" fill="#285682" stroke="#668fb5" />
        <path d="m115 224 25-15 3 8-22 16Z" fill="#102b48" stroke="#365a7c" />
        <path d="M36 83H105M36 220H105" stroke="#93b8d8" strokeOpacity=".3" />
      </svg>
    </div></div>
  </div>;
}
