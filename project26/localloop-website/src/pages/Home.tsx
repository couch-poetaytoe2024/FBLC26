import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useApp } from "../store";
import growthChart from "../assets/growth.png";
import pieChart from "../assets/pie.png";

export function Home() {
  const { xp, level, addOngoingQuest, dailyStatus, markDailyAccepted } = useApp();
  const [showDaily, setShowDaily] = useState(false);
  const [showDailyDone, setShowDailyDone] = useState(false);
  const [displayedXp, setDisplayedXp] = useState(xp);

  const levelProgress = Math.min(100, ((xp % 250) / 250) * 100);

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 20 }, () => {
        const size = 4 + Math.random() * 8; // 4–12px spheres
        const drift = (Math.random() - 0.5) * 16; // slight random horizontal drift
        return {
          left: `${5 + Math.random() * 90}%`,
          delay: `${Math.random() * 3}s`,
          duration: 1.8 + Math.random() * 1.4,
          size,
          drift: `${drift}px`
        };
      }),
    []
  );

  useEffect(() => {
    const start = displayedXp;
    const end = xp;
    if (end === start) return;

    const duration = 600;
    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const current = Math.round(start + (end - start) * t);
      setDisplayedXp(current);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [xp, displayedXp]);

  const handleAcceptDaily = () => {
    if (dailyStatus === "completed") return;
    addOngoingQuest({
      id: "daily-riverside-wifi",
      title: "Today’s Loop: Connect to Riverside Café WiFi",
      description: "Boost digital engagement for a local café.",
      xp: 120
    });
    markDailyAccepted();
    setShowDaily(false);
  };

  return (
    <div className="ll-home">
      <div className="ll-home-topbar">
        <div className="ll-home-topbar-left">
          <div className="ll-home-avatar">
            <span>A</span>
          </div>
          <div className="ll-home-user">
            <div className="ll-home-name">Andy Jin</div>
            <div className="ll-home-meta">
              <span className="ll-home-level">Level {level}</span>
              <span className="ll-home-xp">{displayedXp} XP</span>
            </div>
            <div className="ll-home-xpbar">
              <div
                className="ll-home-xpbar-fill"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="ll-home-topbar-right">
          <Button
            variant="primary"
            onClick={() => {
              if (dailyStatus === "completed") {
                setShowDailyDone(true);
              } else {
                setShowDaily((v) => !v);
              }
            }}
          >
            {dailyStatus === "completed"
              ? "Daily Completed"
              : dailyStatus === "accepted"
              ? "Daily In Progress"
              : "Daily Challenge"}
          </Button>
        </div>
      </div>

      <section className="ll-home-hero">
        <h1 className="ll-home-hero-title">
          Turn everyday actions into measurable local impact.
        </h1>
        <p className="ll-home-hero-subtext">
          LocalLoop gamifies civic engagement through small daily actions—everything
          from connecting to a neighborhood café’s WiFi to sharing porch libraries
          or auditing school walking routes. Each loop you complete earns XP,
          moves you up the leaderboard, and contributes to community goals.
          The more you participate, the more your block grows.
        </p>
      </section>

      {showDaily && (
        <section className="ll-home-daily">
          <Card title="Today’s Loop" subtitle="A tiny action to nudge your block forward.">
            <div className="ll-home-daily-body">
              <div>
                <div className="ll-home-daily-task">Connect to Riverside Café WiFi</div>
                <p className="ll-home-daily-desc">
                  Boost digital engagement for a local café.
                </p>
                <div className="ll-home-daily-reward">Reward · +120 XP</div>
              </div>
              <Button variant="primary" onClick={handleAcceptDaily}>
                Add to Ongoing
              </Button>
            </div>
          </Card>
        </section>
      )}

      {showDailyDone && dailyStatus === "completed" && (
        <section className="ll-home-daily">
          <Card title="All done for today" subtitle="You’ve already completed the daily loop.">
            <div className="ll-home-daily-body">
              <div>
                <p className="ll-home-daily-desc">
                  Come back tomorrow for a fresh daily challenge.
                </p>
              </div>
              <Button variant="ghost" onClick={() => setShowDailyDone(false)}>
                ✕
              </Button>
            </div>
          </Card>
        </section>
      )}

      <section className="ll-home-bottom-grid">
        <Card title="Community Loop Growth">
          <img
            src={growthChart}
            alt="Community loop growth"
            className="ll-home-bottom-image"
          />
          <p className="ll-home-growth-desc">
            Grew 89% over 3 months · 64 new users
          </p>
        </Card>
        <Card title="Loop Categories">
          <img src={pieChart} alt="Loop categories" className="ll-home-bottom-image" />
          <div className="ll-home-pie-key">
            <div className="ll-home-pie-key-item">
              <span className="ll-home-pie-key-dot" style={{ background: "#38bdf8" }} />
              <span>50% restaurants/food</span>
            </div>
            <div className="ll-home-pie-key-item">
              <span className="ll-home-pie-key-dot" style={{ background: "#eab308" }} />
              <span>40% stores/retail</span>
            </div>
            <div className="ll-home-pie-key-item">
              <span className="ll-home-pie-key-dot" style={{ background: "#22c55e" }} />
              <span>10% other</span>
            </div>
          </div>
        </Card>
        <Card title="Community Goal This Month">
          <div className="ll-home-goal">
            <div className="ll-home-goal-main">$2,400 of $5,000 reached</div>
            <div className="ll-home-goal-sub">48% complete · Community goal this month</div>
            <div className="ll-home-goal-layout">
              <div className="ll-home-vertical-tank">
                <div className="ll-home-tank-rain" aria-hidden="true">
                  {rainDrops.map((d, i) => (
                    <span
                      key={i}
                      className="ll-home-rain-drop"
                      style={{
                        left: d.left,
                        width: d.size,
                        height: d.size,
                        animationDelay: d.delay,
                        animationDuration: `${d.duration}s`,
                        ["--drift" as string]: d.drift
                      }}
                    />
                  ))}
                </div>
                <div className="ll-home-vertical-fill" />
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

