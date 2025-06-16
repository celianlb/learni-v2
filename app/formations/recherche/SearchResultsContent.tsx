"use client";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useFilterFormationStore } from "@/store/filterFormationStore";
import { FormationWithRelations } from "@/types/formation";
import { Tag } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterFormation from "../Formation/Filter/filter-formation";
import FormationCard from "../Formation/formation-card";
import FormationCardSkeleton from "../Formation/formation-card-skeleton";

export default function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState<FormationWithRelations[]>([]);
  const [filteredResults, setFilteredResults] = useState<
    FormationWithRelations[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const { appliedFilters, resetFilters } = useFilterFormationStore();
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        let url = "/api/formation/search";
        if (query) {
          url += `?q=${encodeURIComponent(query)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  useEffect(() => {
    // Filtrage en temps réel
    let filtered = results;
    const hasActiveFilters =
      appliedFilters.categories.length > 0 ||
      appliedFilters.tags.length > 0 ||
      appliedFilters.levels.length > 0 ||
      appliedFilters.budget[0] !== 0 ||
      appliedFilters.budget[1] !== 5000;

    // Si aucun filtre n'est actif, afficher tous les résultats
    if (!hasActiveFilters) {
      setFilteredResults(results);
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
  }, [results, appliedFilters]);

  useEffect(() => {
    setVisibleCount(12); // Réinitialise la pagination à chaque nouvelle recherche/filtre
  }, [results, appliedFilters]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/formations/recherche${
        searchInput ? `?q=${encodeURIComponent(searchInput)}` : ""
      }`
    );
  };

  const handleReset = () => {
    setSearchInput("");
    resetFilters();
    router.push("/formations/recherche");
  };

  return (
    <div className="container mx-auto px-4 py-48">
      <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-2">
        <Input
          type="text"
          placeholder="Rechercher une formation..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-lg"
        />
        <Button
          type="submit"
          className="bg-custom-blue-900 text-white px-4 py-2 rounded-lg"
        >
          Rechercher
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 ml-2"
        >
          Réinitialiser
        </Button>
      </form>
      <FilterFormation />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold">
          {query ? `Résultats pour "${query}"` : "Toutes les formations"}
        </h1>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <FormationCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredResults.length > 0 ? (
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
                className="px-6 py-2 bg-custom-blue-900 text-white rounded-lg shadow hover:bg-custom-blue-800"
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
