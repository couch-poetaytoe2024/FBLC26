import React, { useEffect, useState } from "react";

interface ParticleBurstProps {
  triggerKey: string | number;
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: string;
  color: string;
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({ triggerKey }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!triggerKey) {
      setParticles([]);
      return;
    }

    const count = 32;
    const next: Particle[] = Array.from({ length: count }).map((_, idx) => {
      const angle = (idx / count) * Math.PI * 2;
      const distance = 30 + Math.random() * 50;
      return {
        id: idx,
        angle,
        distance,
        size: 4 + Math.random() * 3,
        delay: `${Math.random() * 0.12}s`,
        color: Math.random() > 0.5 ? "#22c55e" : "#38bdf8"
      };
    });
    setParticles(next);
    const timer = setTimeout(() => setParticles([]), 650);
    return () => clearTimeout(timer);
  }, [triggerKey]);

  if (particles.length === 0) return null;

  return (
    <div className="ll-particle-layer" aria-hidden="true">
      {particles.map((p) => {
        const x = Math.cos(p.angle) * p.distance;
        const y = Math.sin(p.angle) * p.distance;
        return (
          <span
            key={p.id}
            className="ll-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              "--px": x.toString(),
              "--py": y.toString()
            } as React.CSSProperties & { "--px": string; "--py": string }}
          />
        );
      })}
    </div>
  );
};
