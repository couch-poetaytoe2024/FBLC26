import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...rest }) => {
  const classes = ["ll-btn", variant === "primary" ? "ll-btn-primary" : "ll-btn-ghost", className]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...rest} />;
};

