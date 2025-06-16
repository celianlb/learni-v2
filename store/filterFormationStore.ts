import { create } from "zustand";

export type Filters = {
  categories: string[];
  tags: string[];
  levels: string[];
  durations: string[];
  formats: string[];
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
  categories: [],
  tags: [],
  levels: [],
  durations: [],
  formats: [],
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
