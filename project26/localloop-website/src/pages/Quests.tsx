import React, { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useApp, OngoingQuest } from "../store";
import { ParticleBurst } from "../components/ParticleBurst";

type CatalogQuest = {
  id: string;
  title: string;
  description: string;
  xp: number;
  started?: boolean;
};

const initialCatalog: CatalogQuest[] = [
  {
    id: "catalog-compost-alley",
    title: "Alley Compost Drop",
    description: "Pilot a shared compost bin for your building’s back alley.",
    xp: 130
  },
  {
    id: "catalog-school-walk",
    title: "School Walk Audit",
    description: "Map kid-unfriendly spots on the walk to the neighborhood school.",
    xp: 95
  },
  {
    id: "catalog-porch-swap",
    title: "Porch Swap Loop",
    description: "Host a tiny free shelf for books or toys on your porch.",
    xp: 100
  }
];

const leaderboard = [
  { rank: 1, name: "Jun Park", points: 1840 },
  { rank: 2, name: "Marta León", points: 1730 },
  { rank: 3, name: "Priya Desai", points: 1660 },
  { rank: 4, name: "Samir Ali", points: 1540 },
  { rank: 5, name: "Casey Wu", points: 1475 },
  { rank: 6, name: "Nora Klein", points: 1390 },
  { rank: 7, name: "Leah Brooks", points: 1325 },
  { rank: 8, name: "Diego Cruz", points: 1280 }
];

export function Quests() {
  const { ongoing, completeOngoingQuest, addOngoingQuest, xp } = useApp();
  const [catalog, setCatalog] = useState<CatalogQuest[]>(initialCatalog);
  const [ongoingBursts, setOngoingBursts] = useState<Record<string, number>>({});
  const [catalogBursts, setCatalogBursts] = useState<Record<string, number>>({});

  const handleComplete = (quest: OngoingQuest) => {
    setOngoingBursts((prev) => ({ ...prev, [quest.id]: (prev[quest.id] ?? 0) + 1 }));
    completeOngoingQuest(quest.id, quest.xp);
    // If this quest came from the catalog, also remove it from the catalog list
    setCatalog((prev) => prev.filter((q) => q.id !== quest.id));
  };

  const handleStartFromCatalog = (quest: CatalogQuest) => {
    if (quest.started) return;
    setCatalogBursts((prev) => ({ ...prev, [quest.id]: (prev[quest.id] ?? 0) + 1 }));
    setCatalog((prev) =>
      prev.map((q) => (q.id === quest.id ? { ...q, started: true } : q))
    );

    addOngoingQuest({
      id: quest.id,
      title: quest.title,
      description: quest.description,
      xp: quest.xp
    });
  };

  const visibleCatalog = catalog.filter((q) => !q.started);

  return (
    <div className="ll-quests-layout">
      <aside className="ll-quests-leaderboard-col">
        <Card title="Leaderboard" subtitle="Top neighbors in this block.">
          <div className="ll-leaderboard">
            {leaderboard.map((entry) => (
              <div key={entry.rank} className="ll-leaderboard-row">
                <span className="ll-leaderboard-rank">{entry.rank}</span>
                <span className="ll-leaderboard-name">{entry.name}</span>
                <span className="ll-leaderboard-points">
                  {entry.points.toLocaleString()} pts
                </span>
              </div>
            ))}
            <div className="ll-leaderboard-row ll-leaderboard-row-me">
              <span className="ll-leaderboard-rank">18</span>
              <span className="ll-leaderboard-name">Andy Jin</span>
              <span className="ll-leaderboard-points">{xp.toLocaleString()} pts</span>
            </div>
          </div>
        </Card>
      </aside>
      <div className="ll-quests-main-col">
        <Card
          title="Ongoing"
        subtitle="Loops you’ve accepted and can complete this week."
      >
        {ongoing.length === 0 ? (
          <p className="ll-quests-empty">
            No ongoing loops yet. Start one from Discover or the catalog.
          </p>
        ) : (
          <div className="ll-quests-list">
            {ongoing.map((q) => (
              <article key={q.id} className="ll-ongoing-card">
                <div className="ll-ongoing-main">
                  <h3>{q.title}</h3>
                  <p>{q.description}</p>
                </div>
                <div className="ll-ongoing-meta">
                  <span className="ll-ongoing-xp">+{q.xp} XP</span>
                  <div className="ll-ongoing-button-wrap">
                    <Button variant="primary" onClick={() => handleComplete(q)}>
                      Complete
                    </Button>
                    <ParticleBurst triggerKey={ongoingBursts[q.id] ?? 0} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Card>

      <Card
        title="Quest Catalog"
        subtitle="Pick a loop to add to your ongoing list."
      >
        <div className="ll-quests-list">
          {visibleCatalog.map((q) => (
            <article
              key={q.id}
              className={
                "ll-catalog-card" + (q.started ? " ll-catalog-card-started" : "")
              }
            >
              <div className="ll-catalog-main">
                <h3>{q.title}</h3>
                <p>{q.description}</p>
              </div>
              <div className="ll-catalog-meta">
                <span className="ll-catalog-xp">+{q.xp} XP</span>
                <div className="ll-catalog-button-wrap">
                  <Button
                    variant="primary"
                    onClick={() => handleStartFromCatalog(q)}
                    disabled={q.started}
                  >
                    {q.started ? "Added" : "Start"}
                  </Button>
                  <ParticleBurst triggerKey={catalogBursts[q.id] ?? 0} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Card>
      </div>
    </div>
  );
}

