import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { ConfettiRain } from "./components/ConfettiRain";
import { useApp } from "./store";

export function App() {
  const { celebrationKey } = useApp();

  return (
    <div className="ll-root">
      <NavBar />
      <main className="ll-main">
        <Outlet />
      </main>
      <ConfettiRain triggerKey={celebrationKey} />
    </div>
  );
}

