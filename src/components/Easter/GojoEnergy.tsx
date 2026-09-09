import { useEffect, useRef, type RefObject } from "react";

type Props = { elapsed: RefObject<number>; complete: boolean; reducedMotion: boolean };
const TAU = Math.PI * 2;
const ease = (value: number) => { const x = Math.max(0, Math.min(1, value)); return x * x * (3 - 2 * x); };

/** One bounded canvas loop: no per-particle React updates or external assets. */
export default function GojoEnergy({ elapsed, complete, reducedMotion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let width = 1, height = 1, frame = 0;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(() => { resize(); if (reducedMotion || complete) draw(); });
    const glow = (x: number, y: number, radius: number, color: string, alpha = 1) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${color},${alpha})`);
      gradient.addColorStop(0.18, `rgba(${color},${alpha * 0.55})`);
      gradient.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = gradient; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };
    const draw = () => {
      const time = complete ? 12 : (elapsed.current ?? 0) / 1000;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2, cy = height * 0.47;
      const unit = Math.min(width, height);
      ctx.globalCompositeOperation = "screen";
      // Deterministic star field stays stable on resize and replay.
      for (let i = 0; i < 100; i++) {
        const x = ((Math.sin(i * 127.1) * 43758.5453) % 1 + 1) % 1 * width;
        const y = ((Math.sin(i * 311.7) * 9631.912) % 1 + 1) % 1 * height;
        ctx.fillStyle = `rgba(180,195,240,${0.15 + 0.25 * (0.5 + Math.sin(i + time * 0.6) * 0.5)})`;
        ctx.fillRect(x, y, i % 7 === 0 ? 2 : 1, 1);
      }
      glow(cx, cy, unit * 0.7, "83,35,175", complete ? 0.16 : 0.08);
      if (!complete && time >= 2.4) {
        const fusion = ease((time - 5.5) / 2.4);
        const reveal = ease((time - 2.4) / 0.8);
        const blast = ease((time - 7.9) / 2.8);
        const distance = unit * 0.255 * (1 - fusion);
        const angle = Math.PI + (time - 2.4) * 0.55 + fusion * 3.2;
        const radius = unit * (0.035 + fusion * 0.015 + blast * 0.15);
        for (let side = 0; side < 2; side++) {
          const color = time >= 7.9 ? "173,91,255" : side === 0 ? "45,158,255" : "255,43,100";
          const a = angle + side * Math.PI;
          const x = cx + Math.cos(a) * distance, y = cy + Math.sin(a) * distance * 0.47;
          glow(x, y, radius * 6, color, reveal * 0.42);
          // Spiraling filaments converge on each energy core.
          for (let strand = 0; strand < 7; strand++) {
            ctx.beginPath();
            for (let step = 0; step < 90; step++) {
              const p = step / 89;
              const theta = p * TAU * 1.3 + strand * TAU / 7 + time * (side ? -1 : 1);
              const r = radius * (1.1 + p * 3.4);
              const px = x + Math.cos(theta) * r, py = y + Math.sin(theta) * r * 0.65;
              if (step === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.strokeStyle = `rgba(${color},${0.22 * reveal})`; ctx.lineWidth = 1; ctx.stroke();
          }
          glow(x, y, radius * 1.8, color, reveal);
          glow(x, y, radius * 0.65, "235,238,255", reveal);
          // Particles accelerate towards the cores, then eject into the void.
          for (let i = 0; i < 95; i++) {
            const p = (i / 95 + time * 0.16) % 1;
            const theta = i * 2.39996 + time * 0.25;
            const r = time < 7.9 ? radius * 1.6 + (1 - p) ** 2 * unit * 0.55 : radius + p * unit * (0.4 + blast);
            const px = x + Math.cos(theta) * r, py = y + Math.sin(theta) * r * 0.75;
            ctx.strokeStyle = `rgba(${color},${Math.sin(p * Math.PI) * reveal * 0.65})`;
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(theta) * (2 + blast * 50), py + Math.sin(theta) * (2 + blast * 50)); ctx.stroke();
          }
        }
        if (time >= 7.9) {
          for (let ring = 0; ring < 3; ring++) {
            const p = Math.max(0, Math.min(1, (time - 7.9 - ring * 0.22) / 2));
            ctx.strokeStyle = `rgba(192,150,255,${(1 - p) * 0.65})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.ellipse(cx, cy, Math.max(1, p * width * 0.85), Math.max(1, p * width * 0.4), -0.3, 0, TAU); ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";
    };
    const animate = () => {
      if (!document.hidden) draw();
      frame = requestAnimationFrame(animate);
    };
    resize(); observer.observe(canvas); draw();
    if (!reducedMotion && !complete) frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [elapsed, complete, reducedMotion]);
  return <canvas className="gojo-energy" ref={canvasRef} aria-hidden="true" />;
}
