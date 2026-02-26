import { NavLink } from "react-router-dom";
import { Button } from "./Button";

export function NavBar() {
  return (
    <nav className="ll-nav">
      <div className="ll-nav-left">
        <div className="ll-logo-badge">
          <div className="ll-logo-mark" />
        </div>
        <div className="ll-brand">
          <span className="ll-brand-name">LocalLoop</span>
          <span className="ll-brand-tagline">Neighborhood impact, in motion</span>
        </div>
      </div>
      <div className="ll-nav-links">
        <NavItem to="/" label="Home" />
        <NavItem to="/discover" label="Discover" />
        <NavItem to="/quests" label="Quests" />
      </div>
      <div className="ll-nav-cta">
        <span className="ll-nav-pill">Beta · Block 26</span>
        <Button variant="primary">Open the loop</Button>
      </div>
    </nav>
  );
}

interface NavItemProps {
  to: string;
  label: string;
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ["ll-nav-link", isActive ? "ll-nav-link-active" : ""].filter(Boolean).join(" ")
      }
      end={to === "/"}
    >
      <span className="dot" />
      <span>{label}</span>
    </NavLink>
  );
}

