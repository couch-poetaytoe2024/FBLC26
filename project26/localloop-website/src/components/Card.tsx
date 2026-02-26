import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, rightSlot, children }) => {
  return (
    <section className="ll-card">
      {(title || subtitle || rightSlot) && (
        <header className="ll-card-header">
          <div>
            {title && <h2 className="ll-card-title">{title}</h2>}
            {subtitle && <p className="ll-card-subtitle">{subtitle}</p>}
          </div>
          {rightSlot && <div>{rightSlot}</div>}
        </header>
      )}
      {children}
    </section>
  );
};

