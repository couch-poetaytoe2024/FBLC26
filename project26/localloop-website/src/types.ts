export type QuestCategory = "cleanup" | "sharing" | "garden" | "safety";

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: "easy" | "medium" | "hard";
  xp: number;
  completed: boolean;
  neighborsParticipating: number;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "steady";
}

