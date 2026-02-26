import React, { useEffect, useState } from "react";

interface ConfettiRainProps {
  triggerKey: number;
}

interface Drop {
  id: number;
  left: string;
  delay: string;
  color: string;
}

export const ConfettiRain: React.FC<ConfettiRainProps> = ({ triggerKey }) => {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    if (!triggerKey) {
      setDrops([]);
      return;
    }

    const count = 40;
    const next: Drop[] = Array.from({ length: count }).map((_, idx) => ({
      id: idx,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 0.25}s`,
      color: Math.random() > 0.5 ? "#22c55e" : "#38bdf8"
    }));
    setDrops(next);
    const timer = setTimeout(() => setDrops([]), 1200);
    return () => clearTimeout(timer);
  }, [triggerKey]);

  if (drops.length === 0) return null;

  return (
    <div className="ll-confetti-rain-layer" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="ll-confetti-rain-piece"
          style={{
            left: d.left,
            animationDelay: d.delay,
            background: d.color
          }}
        />
      ))}
    </div>
  );
};

