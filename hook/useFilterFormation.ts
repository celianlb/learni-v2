import { useState } from "react";

export type FilterFormationState = {
  levels: string[];
  selectedLevels: string[];
  toggleLevel: (level: string) => void;
  tags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  budget: [number, number];
  setBudget: (val: [number, number]) => void;
};

const LEVELS = ["Débutant", "Initiation", "Intermédiaire", "Avancée", "Expert"];

const TAGS = [
  "IA",
  "ChatGPT",
  "Back-End",
  "Python",
  "JavaScript",
  "Montage",
  "Data",
  "Front-End",
  "No-Code",
  "Design",
];

export function useFilterFormation(): FilterFormationState {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [budget, setBudget] = useState<[number, number]>([0, 2000]);

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return {
    levels: LEVELS,
    selectedLevels,
    toggleLevel,
    tags: TAGS,
    selectedTags,
    toggleTag,
    budget,
    setBudget,
  };
}
