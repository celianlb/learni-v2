import { create } from "zustand";

const LEVELS = [
  "debutant",
  "initiation",
  "intermediaire",
  "avance",
  "expert",
  "tous publics",
];

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

export type Filters = {
  levels: string[];
  tags: string[];
  budget: [number, number];
};

interface FilterFormationStore {
  editingFilters: Filters;
  appliedFilters: Filters;
  setEditing: (filters: Partial<Filters>) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const defaultFilters: Filters = {
  levels: [],
  tags: [],
  budget: [0, 5000],
};

export const useFilterFormationStore = create<FilterFormationStore>((set) => ({
  editingFilters: { ...defaultFilters },
  appliedFilters: { ...defaultFilters },
  setEditing: (filters) =>
    set((state) => ({
      editingFilters: { ...state.editingFilters, ...filters },
    })),
  applyFilters: () =>
    set((state) => ({
      appliedFilters: { ...state.editingFilters },
    })),
  resetFilters: () =>
    set(() => ({
      editingFilters: { ...defaultFilters },
      appliedFilters: { ...defaultFilters },
    })),
}));

export { LEVELS, TAGS };
