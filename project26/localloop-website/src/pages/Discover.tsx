import React, { useState } from "react";
import mapImage from "../assets/map.png";
import type { QuestCategory } from "../types";
import { useApp } from "../store";
import { ParticleBurst } from "../components/ParticleBurst";

type DiscoverQuest = {
  id: string;
  title: string;
  description: string;
  xp: number;
  category: QuestCategory;
  difficulty: "easy" | "medium" | "hard";
  neighborsParticipating: number;
  started?: boolean;
};

const initialDiscoverQuests: DiscoverQuest[] = [
  {
    id: "loop-riverside",
    title: "Riverside WiFi Loop",
    description: "Check in from the café WiFi so we can see peak community hours.",
    xp: 120,
    category: "sharing",
    difficulty: "easy",
    neighborsParticipating: 7
  },
  {
    id: "loop-crosswalk",
    title: "Crosswalk Count",
    description: "Log how many people cross at 5th & Main in 15 minutes.",
    xp: 90,
    category: "safety",
    difficulty: "medium",
    neighborsParticipating: 5
  },
  {
    id: "loop-library",
    title: "Library Third Place Pulse",
    description: "Note how many people are working vs. hanging out in the reading room.",
    xp: 80,
    category: "cleanup",
    difficulty: "easy",
    neighborsParticipating: 4
  },
  {
    id: "loop-market",
    title: "Corner Market Loop",
    description: "Ask if they’d list unsold produce at a neighbor discount.",
    xp: 110,
    category: "sharing",
    difficulty: "medium",
    neighborsParticipating: 6
  }
];

export function Discover() {
  const { addOngoingQuest, hiddenDiscoverIds, hideDiscoverQuest } = useApp();
  const [available, setAvailable] = useState<DiscoverQuest[]>(
    initialDiscoverQuests.filter((q) => !hiddenDiscoverIds.includes(q.id))
  );
  const [bursts, setBursts] = useState<Record<string, number>>({});

  const handleStart = (quest: DiscoverQuest) => {
    if (quest.started) return;

    setBursts((prev) => ({ ...prev, [quest.id]: (prev[quest.id] ?? 0) + 1 }));
    addOngoingQuest({
      id: quest.id,
      title: quest.title,
      description: quest.description,
      xp: quest.xp
    });
    hideDiscoverQuest(quest.id);
    // Remove card after VFX has played
    setTimeout(() => {
      setAvailable((prev) => prev.filter((q) => q.id !== quest.id));
    }, 650);
  };

  return (
    <div className="ll-discover">
      <div className="ll-discover-map">
        <div className="ll-discover-map-inner">
          <img
            src={mapImage}
            alt="Map of LocalLoop zones near you"
            className="ll-discover-map-image"
          />
        </div>
        <div className="ll-discover-map-label">Loop Zones Near You</div>
        <div className="ll-discover-map-badge">17 Nearby Businesses</div>
      </div>
      <aside className="ll-discover-panel">
        <header className="ll-discover-panel-header">
          <h2>Available Loops</h2>
          <p>Curated civic engagements near you.</p>
        </header>
        <div className="ll-discover-panel-list">
          {available.map((quest) => (
            <article
              key={quest.id}
              className={
                "ll-discover-quest-card" + (quest.started ? " ll-discover-quest-card-started" : "")
              }
            >
              <div className="ll-discover-quest-main">
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
              </div>
              <div className="ll-discover-quest-meta">
                <span className="ll-discover-quest-xp">+{quest.xp} XP</span>
                <div className="ll-discover-quest-button-wrap">
                  <button
                    type="button"
                    className={
                      "ll-discover-quest-button" +
                      (quest.started ? " ll-discover-quest-button-started" : "")
                    }
                    onClick={() => handleStart(quest)}
                    disabled={quest.started}
                  >
                    {quest.started ? "Started" : "Start"}
                  </button>
                  <ParticleBurst triggerKey={bursts[quest.id] ?? 0} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </div>
  );
}
