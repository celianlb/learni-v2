"use client";
import { Tag } from "@/components/formation/filter/types";
import FormationCard from "@/components/formation/formation-card";
import { useFilterFormationStore } from "@/store/filterFormationStore";
import { FormationWithRelations } from "@/types/formation";
import { useEffect, useState } from "react";

interface SearchResultsClientProps {
  initialResults: FormationWithRelations[];
  query?: string;
}

export default function SearchResultsClient({
  initialResults,
  query = "",
}: SearchResultsClientProps) {
  const [filteredResults, setFilteredResults] =
    useState<FormationWithRelations[]>(initialResults);
  const { appliedFilters } = useFilterFormationStore();
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    // Filtrage en temps réel
    let filtered = initialResults;
    const hasActiveFilters =
      appliedFilters.categories.length > 0 ||
      appliedFilters.tags.length > 0 ||
      appliedFilters.levels.length > 0 ||
      appliedFilters.durations.length > 0 ||
      appliedFilters.formats.length > 0 ||
      appliedFilters.budget[0] !== 0 ||
      appliedFilters.budget[1] !== 5000;

    // Si aucun filtre n'est actif, afficher tous les résultats
    if (!hasActiveFilters) {
      setFilteredResults(initialResults);
      return;
    }

    // Filtre catégories
    if (appliedFilters.categories.length > 0) {
      filtered = filtered.filter(
        (f) => f.category && appliedFilters.categories.includes(f.category.name)
      );
    }

    // Filtre tags
    if (appliedFilters.tags.length > 0) {
      filtered = filtered.filter((f) =>
        f.tags.some((tag: Tag) => appliedFilters.tags.includes(tag.name))
      );
    }

    // Filtre niveau
    if (appliedFilters.levels.length > 0) {
      filtered = filtered.filter((f) =>
        appliedFilters.levels.includes(f.niveau)
      );
    }

    // Filtre budget
    if (appliedFilters.budget && Array.isArray(appliedFilters.budget)) {
      filtered = filtered.filter((f) => {
        const price = parseInt(f.tarifIndividuel.replace(/[^0-9]/g, ""));
        return (
          price >= appliedFilters.budget[0] && price <= appliedFilters.budget[1]
        );
      });
    }

    // Filtre durée
    if (appliedFilters.durations.length > 0) {
      filtered = filtered.filter((f) =>
        appliedFilters.durations.includes(f.duree)
      );
    }

    // Filtre format
    if (appliedFilters.formats.length > 0) {
      filtered = filtered.filter((f) =>
        appliedFilters.formats.includes(f.format)
      );
    }

    setFilteredResults(filtered);
  }, [initialResults, appliedFilters]);

  useEffect(() => {
    setVisibleCount(12); // Réinitialise la pagination à chaque nouveau filtre
  }, [initialResults, appliedFilters]);

  return (
    <div className="lg:col-span-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold">
          {query ? `Résultats pour "${query}"` : "Toutes les formations"}
        </h1>
        {filteredResults.length !== initialResults.length && (
          <span className="text-sm text-gray-600">
            {filteredResults.length} résultat(s) sur {initialResults.length}
          </span>
        )}
      </div>

      {filteredResults.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.slice(0, visibleCount).map((formation) => (
              <FormationCard
                key={formation.id}
                formation={formation}
                variant="default"
              />
            ))}
          </div>
          {visibleCount < filteredResults.length && (
            <div className="flex justify-center mt-8">
              <button
                className="px-6 py-2 cursor-pointer text-custom-blue-900 rounded-lg hover:bg-custom-blue-800 hover:text-white transition-all duration-300 ease-in-out"
                onClick={() => setVisibleCount((c) => c + 12)}
              >
                Voir plus
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {query
            ? `Aucun résultat trouvé pour "${query}"`
            : "Aucune formation ne correspond aux filtres"}
        </div>
      )}
    </div>
  );
}
