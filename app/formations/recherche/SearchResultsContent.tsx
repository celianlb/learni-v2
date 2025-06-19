import FilterFormation from "@/components/formation/filter/filter-formation";
import { Category, Tag } from "@/components/formation/filter/types";
import SearchForm from "@/components/formation/search-form";
import SearchResultsClient from "@/components/formation/search-results-client";
import {
  getCategories,
  getFormationFilterData,
  getTags,
} from "@/queries/getFilterData";
import { searchFormations } from "@/queries/searchFormations";
import { FormationWithRelations } from "@/types/formation";

interface SearchResultsContentProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchResultsContent({
  searchParams,
}: SearchResultsContentProps) {
  const { q: query } = await searchParams;

  // Récupération des données côté serveur en parallèle avec gestion d'erreur
  let results: FormationWithRelations[] = [];
  let categories: Category[] = [];
  let tags: Tag[] = [];
  let filterData = {
    levels: [] as string[],
    durations: [] as string[],
    formats: [] as string[],
  };

  try {
    [results, categories, tags, filterData] = await Promise.all([
      searchFormations(query),
      getCategories(),
      getTags(),
      getFormationFilterData(),
    ]);
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    // En cas d'erreur, on utilise des valeurs par défaut
  }

  return (
    <div className="container mx-auto px-4 py-48">
      <SearchForm initialQuery={query || ""} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Colonne des filtres */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <FilterFormation
              initialCategories={categories}
              initialTags={tags}
              initialLevels={filterData.levels}
              initialDurations={filterData.durations}
              initialFormats={filterData.formats}
            />
          </div>
        </div>

        {/* Colonne des résultats */}
        <SearchResultsClient initialResults={results} query={query || ""} />
      </div>
    </div>
  );
}
