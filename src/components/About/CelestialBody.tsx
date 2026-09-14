import type { ReactNode } from "react";

interface CelestialBodyProps {
  name: string;
  className: string;
  children?: ReactNode;
  isSun?: boolean;
}

// Ces astres sont des illustrations et ne déclenchent aucune action.
function CelestialBody({ name, className, children, isSun }: CelestialBodyProps) {
  return (
    <div
      className={`celestial-body ${isSun ? "" : "planet"} ${className}`}
      role="img"
      aria-label={name}
      data-body-name={name}
    >
      {children}
    </div>
  );
}

export default CelestialBody;
