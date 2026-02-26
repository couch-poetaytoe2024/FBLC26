import React, { createContext, useContext, useMemo, useState } from "react";
import { allQuests } from "./data";
import type { Quest } from "./types";

export interface OngoingQuest {
  id: string;
  title: string;
  description: string;
  xp: number;
}

type DailyStatus = "available" | "accepted" | "completed";

interface AppState {
  quests: Quest[];
  toggleQuestCompleted: (id: string) => void;
  completionRate: number;
  xp: number;
  level: number;
  gainXp: (amount: number) => void;
  ongoing: OngoingQuest[];
  addOngoingQuest: (quest: OngoingQuest) => void;
  completeOngoingQuest: (id: string, xp: number) => void;
  dailyStatus: DailyStatus;
  markDailyAccepted: () => void;
  celebrationKey: number;
  hiddenDiscoverIds: string[];
  hideDiscoverQuest: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quests, setQuests] = useState<Quest[]>(allQuests);
  const [xp, setXp] = useState<number>(480);
  const [ongoing, setOngoing] = useState<OngoingQuest[]>([]);
  const [dailyStatus, setDailyStatus] = useState<DailyStatus>("available");
  const [celebrationKey, setCelebrationKey] = useState(0);
  const [hiddenDiscoverIds, setHiddenDiscoverIds] = useState<string[]>([]);

  const toggleQuestCompleted = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  };

  const completionRate = useMemo(() => {
    if (quests.length === 0) return 0;
    const completed = quests.filter((q) => q.completed).length;
    return Math.round((completed / quests.length) * 100);
  }, [quests]);

  const level = useMemo(() => 1 + Math.floor(xp / 250), [xp]);

  const gainXp = (amount: number) => {
    setXp((current) => current + amount);
  };

  const addOngoingQuest = (quest: OngoingQuest) => {
    setOngoing((prev) => {
      if (prev.some((q) => q.id === quest.id)) return prev;
      return [...prev, quest];
    });
  };

  const completeOngoingQuest = (id: string, rewardXp: number) => {
    setOngoing((prev) => prev.filter((q) => q.id !== id));
    if (id === "daily-riverside-wifi") {
      setDailyStatus("completed");
    }
    gainXp(rewardXp);
    setCelebrationKey((k) => k + 1);
  };

  const markDailyAccepted = () => {
    setDailyStatus("accepted");
  };

  const hideDiscoverQuest = (id: string) => {
    setHiddenDiscoverIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const value: AppState = {
    quests,
    toggleQuestCompleted,
    completionRate,
    xp,
    level,
    gainXp,
    ongoing,
    addOngoingQuest,
    completeOngoingQuest,
    dailyStatus,
    markDailyAccepted,
    celebrationKey,
    hiddenDiscoverIds,
    hideDiscoverQuest
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}

