"use client";
import Button from "@/components/UI/button";
import Input from "@/components/UI/Input/Input";
import { useFilterFormationStore } from "@/store/filterFormationStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchFormProps {
  initialQuery?: string;
}

export default function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const router = useRouter();
  const { resetFilters } = useFilterFormationStore();
  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    setSearchInput(initialQuery);
  }, [initialQuery]);

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
  );
}
