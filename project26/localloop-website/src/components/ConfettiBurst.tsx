import React, { useEffect, useState } from "react";

interface ConfettiBurstProps {
  triggerKey: string | number;
}

interface Piece {
  id: number;
  left: string;
  top: string;
  delay: string;
  color: "accent" | "accent-alt";
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ triggerKey }) => {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const next: Piece[] = Array.from({ length: 12 }).map((_, idx) => ({
      id: idx,
      left: `${20 + Math.random() * 60}%`,
      top: `${10 + Math.random() * 40}%`,
      delay: `${Math.random() * 0.35}s`,
      color: Math.random() > 0.5 ? "accent" : "accent-alt"
    }));
    setPieces(next);
    const timer = setTimeout(() => setPieces([]), 900);
    return () => clearTimeout(timer);
  }, [triggerKey]);

  if (pieces.length === 0) return null;

  return (
    <div className="ll-confetti-layer" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="ll-confetti-piece"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            background:
              p.color === "accent"
                ? "linear-gradient(180deg, #22c55e, #16a34a)"
                : "linear-gradient(180deg, #38bdf8, #0ea5e9)"
          }}
        />
      ))}
    </div>
  );
};

