import { useState, type ReactNode } from "react";

interface CelestialBodyProps {
  name: string;
  className: string;
  children?: ReactNode;
  isSun?: boolean;
}

function CelestialBody({ name, className, children, isSun }: CelestialBodyProps) {
  const [selected, setSelected] = useState(false);
  return (
    <button
      type="button"
      className={`${isSun ? "" : "planet"} ${className}${selected ? " is-selected" : ""}`}
      aria-label={name}
      aria-pressed={selected}
      onClick={() => setSelected(value => !value)}
      onBlur={() => setSelected(false)}
      onKeyDown={event => { if (event.key === "Escape") { setSelected(false); event.currentTarget.blur(); } }}
    >
      <span className="celestial-body-tooltip" aria-hidden="true">{name}</span>
      {children}
    </button>
  );
}

export default CelestialBody;
