import type { ReactNode } from "react";

interface CelestialBodyProps {
  name: string;
  className: string;
  children?: ReactNode;
  isSun?: boolean;
}

// These bodies are illustrations, not controls: there is no action to activate.
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
