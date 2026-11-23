import "./styles/BlackHole.css";

export default function BlackHole() {
  return <div className="black-hole" aria-hidden="true">
    <div className="black-hole-aura" />
    <div className="black-hole-lensing" />
    <div className="accretion-disk"><div className="accretion-flow" /></div>
    <div className="event-horizon" />
    <div className="accretion-disk accretion-foreground"><div className="accretion-flow" /></div>
    <div className="black-hole-photon-ring" />
  </div>;
}
