import type { Quest, ImpactMetric } from "./types";

export const highlightMetrics: ImpactMetric[] = [
  { id: "waste", label: "Waste diverted", value: 312, unit: "kg", trend: "up" },
  { id: "rides", label: "Shared rides", value: 128, unit: "trips", trend: "up" },
  { id: "gardens", label: "Pocket gardens", value: 14, unit: "plots", trend: "steady" }
];

export const featuredQuests: Quest[] = [
  {
    id: "riverside-cleanup",
    title: "Riverside Cleanup Sprint",
    description: "Join neighbors to pull trash from the river path and log what you collect.",
    category: "cleanup",
    difficulty: "medium",
    xp: 120,
    completed: false,
    neighborsParticipating: 23
  },
  {
    id: "tool-library",
    title: "Tool Library Launch",
    description: "Contribute one tool you rarely use so everyone can borrow instead of buy.",
    category: "sharing",
    difficulty: "easy",
    xp: 80,
    completed: false,
    neighborsParticipating: 31
  },
  {
    id: "corner-garden",
    title: "Corner Pocket Garden",
    description: "Adopt a tiny patch of sidewalk and plant pollinator-friendly natives.",
    category: "garden",
    difficulty: "medium",
    xp: 100,
    completed: false,
    neighborsParticipating: 12
  }
];

export const allQuests: Quest[] = [
  ...featuredQuests,
  {
    id: "night-walk",
    title: "Night Walk Audit",
    description: "Map dark spots on your block and propose low‑cost lighting fixes.",
    category: "safety",
    difficulty: "easy",
    xp: 60,
    completed: false,
    neighborsParticipating: 9
  },
  {
    id: "swap-party",
    title: "Seasonal Swap Party",
    description: "Host a clothing and toy swap to keep items in circulation.",
    category: "sharing",
    difficulty: "medium",
    xp: 95,
    completed: false,
    neighborsParticipating: 17
  }
];

