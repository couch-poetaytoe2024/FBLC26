import React from "react";

interface TankGaugeProps {
  label: string;
  value: number;
}

export const TankGauge: React.FC<TankGaugeProps> = ({ label, value }) => {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <section className="ll-tank">
      <div className="ll-tank-header">
        <span className="ll-tank-label">{label}</span>
        <span className="ll-tank-value">{safeValue}%</span>
      </div>
      <div className="ll-tank-track">
        <div
          className="ll-tank-fill"
          style={{ width: `${safeValue}%`, transition: "width 220ms ease-out" }}
        />
        <div className="ll-tank-grid" />
      </div>
    </section>
  );
};

