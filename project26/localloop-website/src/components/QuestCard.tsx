import React from "react";
import type { Quest } from "../types";
import { Button } from "./Button";
import { useApp } from "../store";

interface QuestCardProps {
  quest: Quest;
  compact?: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, compact }) => {
  const { toggleQuestCompleted, gainXp } = useApp();

  const categoryLabel: Record<Quest["category"], string> = {
    cleanup: "Cleanup",
    garden: "Greenery",
    sharing: "Sharing",
    safety: "Safety"
  };

  const difficultyLabel: Record<Quest["difficulty"], string> = {
    easy: "Easy 15–20 min",
    medium: "Medium 30–45 min",
    hard: "Deep dive"
  };

  const handleClick = () => {
    if (!quest.completed) {
      gainXp(quest.xp);
    }
    toggleQuestCompleted(quest.id);
  };

  return (
    <article className="ll-quest-card">
      <div className="ll-quest-left">
        <div className="ll-quest-title-row">
          <h3 className="ll-quest-title">{quest.title}</h3>
        </div>
        <div className="ll-quest-pill-row">
          <span className="ll-quest-pill">{categoryLabel[quest.category]}</span>
          <span className="ll-quest-pill">{difficultyLabel[quest.difficulty]}</span>
          <span className="ll-quest-pill">{quest.neighborsParticipating} neighbors in</span>
        </div>
        {!compact && <p className="ll-quest-desc">{quest.description}</p>}
      </div>
      <div className="ll-quest-right">
        <span className="ll-quest-xp">+{quest.xp} XP</span>
        <Button variant={quest.completed ? "ghost" : "primary"} onClick={handleClick}>
          {quest.completed ? "Mark incomplete" : "Join quest"}
        </Button>
      </div>
    </article>
  );
};

