/** De petites scènes vectorielles distinguent chaque loisir sans téléchargement d’images. */
export default function HobbyArtwork({ index }: { index: number }) {
  return <svg className="hobby-scene" viewBox="130 0 190 90" fill="none" aria-hidden="true" preserveAspectRatio="xMaxYMid meet">
    {index === 0 && <>
      <circle cx="247" cy="34" r="23" fill="#de7d8950" />
      <path d="M65 90 145 20 220 90Z" fill="#697e9f45" /><path d="m123 40 22-20 23 21-15-4-10 7-8-9Z" fill="#d3dfec80" />
      <path d="M0 86Q65 60 122 81T255 74T340 80V100H0Z" fill="#192d43" />
      <g stroke="#d09193" strokeWidth="4"><path d="M218 58H284M215 51Q249 58 287 49M229 57V88M274 55V88" /></g>
      <path d="M0 9Q44 10 74 42M31 17 47 2M47 25 75 20" stroke="#b7889960" strokeWidth="2" />
      {[ [22,13], [44,8], [57,28], [75,20], [68,38] ].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`} className="hobby-blossom"><path d="M0-4Q7-8 4 0Q9 5 2 4Q-2 10-4 3Q-10 2-4-2Q-5-8 0-4Z" fill="#e8b2bd" opacity=".65" /></g>)}
    </>}
    {index === 2 && <>
      <path d="m24 57 45-28 39 20 38-32 43 36" stroke="#a4b2f74d" />
      {[[24,57],[69,29],[108,49],[146,17],[189,53],[213,16],[302,67],[13,15]].map(([x,y],i)=><circle className="hobby-star" key={i} cx={x} cy={y} r={i<5?2:1} fill="#d1d9ff" />)}
      <g transform="translate(254 45) rotate(-24)"><circle r="24" fill="#8999d135" stroke="#b8c4f166" /><ellipse rx="49" ry="12" stroke="#b8c4f1" strokeWidth="2" /><path d="M-20-12Q0-2 23-9M-23 4Q0 13 21 6" stroke="#aebae333" /></g>
    </>}
    {index === 3 && <>
      <path d="M226 11H291V85H226Z" fill="#d4af7910" stroke="#d4af7935" /><path d="M258 11V85M226 43H291" stroke="#d4af7935" />
      <circle cx="274" cy="27" r="8" fill="#f0d49e50" />
      <path d="M0 82H320" stroke="#dab98b35" />
      <g className="hobby-cat"><path d="M226 82Q215 58 235 48L231 29 245 40Q254 37 265 42L280 30 277 52Q292 73 278 82Z" fill="#b49a7838" stroke="#c4ae8b" strokeWidth="1.5" />
      <path d="M245 57q3 4 6 0M264 57q3 4 6 0M255 63l3 2 3-2M258 66v4M241 64l-13-3M241 68l-14 1M275 64l13-3" stroke="#e8d4b4" strokeLinecap="round" />
      <path className="hobby-cat-tail" d="M228 78Q198 87 198 67Q198 56 189 59" stroke="#c4ae8b" strokeWidth="5" strokeLinecap="round" /></g>
      <g fill="#c4ae8b22"><ellipse cx="53" cy="61" rx="9" ry="7" /><circle cx="42" cy="51" r="4" /><circle cx="51" cy="47" r="4" /><circle cx="60" cy="49" r="4" /><circle cx="66" cy="57" r="4" /></g>
    </>}
    {index === 4 && <>
      <circle cx="255" cy="43" r="25" fill="#e6b67b35" />
      <path d="M0 73Q55 36 110 63T210 64T320 59V90H0Z" fill="#729f9130" /><path d="M0 87Q80 60 147 80T320 77V90H0Z" fill="#80b49c35" />
      <path d="M126 90Q183 72 157 65T173 50" stroke="#d5d6a880" strokeWidth="2" strokeDasharray="3 4" />
      <path d="m216 21 7 3 7-3m-28 11 5 2 5-2" stroke="#ecd7b6" strokeLinecap="round" />
      <path d="M46 61V29M33 44l13-24 14 24ZM29 54l17-26 19 26Z" fill="#8bbba326" stroke="#8bbba365" />
    </>}
    {index === 5 && <>
      <ellipse className="hobby-mayhem-halo" cx="253" cy="48" rx="51" ry="42" fill="#d6426526" />
      <path d="M193 87V45Q193 3 253 3T313 45V87M202 87V45Q202 12 253 12T304 45V87" stroke="#dc8c9e26" />
      <path d="M177 87H319" stroke="#e497aa40" />
      <g strokeLinejoin="round">
        {/* Sculptural headdress, puffed shoulders and the oversized draped red gown. */}
        <path d="M249 23Q240 17 234 5Q246 10 253 17Q260 10 272 5Q266 17 257 23Z" fill="#541b32" stroke="#dc8097" strokeWidth="1.1" />
        <path d="m244 19-5-12 12 10m11 2 5-12-12 10" stroke="#d77d92" />
        <ellipse cx="253" cy="23" rx="4.3" ry="5.5" fill="#edc5c7" />
        <path d="M249 27V31H257V27" fill="#c96e82" />
        <path d="M245 31Q235 26 234 37L239 47 246 43H260L267 47 272 37Q271 26 261 31L257 29H249Z" fill="#ac304f" stroke="#e58b9e" strokeWidth="1.1" />
        <path d="m239 32-4-5m7 5-1-8m26 8 4-5m-7 5 1-8" stroke="#e8b2bc" strokeWidth="1.1" strokeLinecap="round" />
        <path d="m246 33 3 13h8l3-13M249 34h8m-7 4h6m-6 4h6" stroke="#f0a2b2" strokeWidth=".8" />
        <path d="M249 45Q218 44 210 61L205 87Q253 93 301 87L296 61Q288 44 257 45Z" fill="#92243f" stroke="#df7c94" strokeWidth="1.2" />
        <path d="M249 47Q222 47 211 61Q253 67 295 61Q284 47 257 47" fill="#b63855" stroke="#e3869c" strokeWidth=".9" />
        <path d="M221 64Q227 88 247 66M259 66Q279 88 285 64M218 64Q228 91 246 70M260 70Q278 91 288 64" stroke="#e7859d" strokeWidth=".9" />
        <path d="m218 66-6 20m17-12-4 14m16-11-2 11m14-22v23m13-12 2 11m12-14 4 14m4-22 6 20M231 51l-8 11m20-14-4 15m25-15 4 15m7-12 8 11" stroke="#5b142c" strokeWidth="1.4" />
        <path d="M239 38l5 9 6-1m17-8-5 9-6-1" stroke="#f1a3b4" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <path className="hobby-star" d="M186 30v8m-4-4h8M309 21v6m-3-3h6" stroke="#efbdc9" strokeLinecap="round" />
    </>}
    {index === 7 && <>
      <path d="M15 17H109V35H42V58H79V77H17M123 17V55H152V75M148 17H179V44H192" stroke="#bda8e845" strokeWidth="2" strokeLinejoin="round" />
      <path d="M246 18q20 0 20 20q0 14-12 18v15h-16V56q-12-4-12-18q0-20 20-20Z" fill="#baa0df15" stroke="#bea8e8" strokeWidth="1.6" /><circle cx="246" cy="36" r="7" stroke="#e2d5ff" /><path d="M246 43V60" stroke="#e2d5ff" />
      <path className="hobby-key" d="M283 61a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm-7-4-19 19m6-6 4 4m-9 1 4 4" stroke="#cdbbe9" strokeWidth="2" />
    </>}
  </svg>;
}
