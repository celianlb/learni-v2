"use client";
import Input from "@/components/UI/Input/Input";
import { useFilterFormationStore } from "@/store/filterFormationStore";
import {
  AcademicCapIcon,
  ClockIcon,
  DeviceTabletIcon,
  Squares2X2Icon,
  TagIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { BudgetDoubleSlider } from "./budget-double-slider";
import { Category, Tag } from "./types";

type FilterFormationProps = {
  onValidate?: () => void;
  initialCategories?: Category[];
  initialTags?: Tag[];
  initialLevels?: string[];
  initialDurations?: string[];
  initialFormats?: string[];
};

const FilterFormation: React.FC<FilterFormationProps> = ({
  initialCategories = [],
  initialTags = [],
  initialLevels = [],
  initialDurations = [],
  initialFormats = [],
}) => {
  const { editingFilters, setEditing, applyFilters } =
    useFilterFormationStore();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [levels, setLevels] = useState<string[]>(initialLevels);
  const [durations, setDurations] = useState<string[]>(initialDurations);
  const [formats, setFormats] = useState<string[]>(initialFormats);

  // États pour les dropdowns custom
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [isFormatDropdownOpen, setIsFormatDropdownOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");

  // Références pour fermer le dropdown en cliquant à l'extérieur
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  const durationDropdownRef = useRef<HTMLDivElement>(null);
  const formatDropdownRef = useRef<HTMLDivElement>(null);

  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [levelSearch, setLevelSearch] = useState("");
  const levelDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si les données initiales sont fournies, les utiliser
    if (initialCategories.length > 0) {
      setCategories(initialCategories);
    }
    if (initialTags.length > 0) {
      setTags(initialTags);
    }
    if (initialLevels.length > 0) {
      setLevels(initialLevels);
    }
    if (initialDurations.length > 0) {
      setDurations(initialDurations);
    }
    if (initialFormats.length > 0) {
      setFormats(initialFormats);
    }

    // Si aucune donnée initiale n'est fournie, faire l'appel API
    if (
      initialCategories.length === 0 &&
      initialTags.length === 0 &&
      initialLevels.length === 0
    ) {
      const fetchData = async () => {
        try {
          const categoriesResponse = await fetch("/api/categories");
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);

          const tagsResponse = await fetch("/api/tags");
          const tagsData = await tagsResponse.json();
          setTags(tagsData);

          const formationsResponse = await fetch("/api/formations");
          const formationsData: {
            niveau: string;
            duree: string;
            format: string;
          }[] = await formationsResponse.json();
          const uniqueLevels = Array.from(
            new Set(formationsData.map((f) => f.niveau))
          ).filter(Boolean) as string[];
          setLevels(uniqueLevels);
          // Normalisation des durées
          const normalizeDuration = (duree: string) => {
            if (!duree) return null;
            const d = duree.toLowerCase().replace(/\s/g, "");
            if (d.startsWith("1j")) return "1 jour";
            if (d.startsWith("2j")) return "2 jours";
            if (d.startsWith("3j")) return "3 jours";
            return duree;
          };
          const uniqueDurations = Array.from(
            new Set(
              formationsData
                .map((f) => normalizeDuration(f.duree))
                .filter(Boolean)
            )
          ).filter((d): d is string => typeof d === "string");
          setDurations(uniqueDurations);
          const uniqueFormats = Array.from(
            new Set(formationsData.map((f) => f.format))
          ).filter(Boolean) as string[];
          setFormats(uniqueFormats);
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
        }
      };
      fetchData();
    }
  }, [
    initialCategories,
    initialTags,
    initialLevels,
    initialDurations,
    initialFormats,
  ]);

  // Gestion catégories (boutons)
  const handleCategoryClick = (catName: string) => {
    setEditing({
      categories: editingFilters.categories.includes(catName)
        ? editingFilters.categories.filter((c) => c !== catName)
        : [...editingFilters.categories, catName],
    });
    applyFilters();
  };

  // Gestion budget
  const handleBudgetChange = (val: [number, number]) => {
    setEditing({ budget: val });
    applyFilters();
  };

  // Fermer les dropdowns en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTagDropdownOpen(false);
      }
      if (
        durationDropdownRef.current &&
        !durationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDurationDropdownOpen(false);
      }
      if (
        formatDropdownRef.current &&
        !formatDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFormatDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fonction utilitaire pour enlever les accents
  function normalizeString(str: string) {
    return str
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
  }

  // Filtrer les catégories et tags en fonction de la recherche (insensible aux accents)
  const filteredCategories = categories.filter((cat) =>
    normalizeString(cat.name).includes(normalizeString(categorySearch))
  );
  const filteredTags = tags.filter((tag) =>
    normalizeString(tag.name).includes(normalizeString(tagSearch))
  );

  // Filtrer les durées et formats en fonction de la recherche
  const filteredDurations = durations;
  const filteredFormats = formats;

  // Filtrer les niveaux en fonction de la recherche (insensible aux accents)
  const filteredLevels = levels.filter((level) =>
    normalizeString(level).includes(normalizeString(levelSearch))
  );

  // Fermer le dropdown niveau en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        levelDropdownRef.current &&
        !levelDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLevelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fonction utilitaire pour mettre la première lettre en majuscule
  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Chevron SVG
  const Chevron: React.FC<{ open: boolean }> = ({ open }) => (
    <svg
      className={`ml-2 inline-block transition-transform duration-200 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8L10 12L14 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="flex flex-col gap-6 bg-white p-4 rounded-xl shadow mb-8">
      {/* En-tête avec bouton de réinitialisation */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-work-sans font-semibold text-custom-blue-900">
          Filtres
        </h3>
      </div>

      {/* Catégories */}
      <div ref={categoryDropdownRef} className="relative w-full">
        <button
          className="px-4 py-2 border border-blue-950/30 bg-white cursor-pointer hover:bg-blue-50 rounded-lg text-sm w-full text-left flex items-center justify-between transition-colors"
          onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
        >
          <span className="flex items-center gap-2">
            <Squares2X2Icon className="w-5 h-5 text-custom-blue-900" />
            Catégories
          </span>
          <span className="truncate ml-2">
            {editingFilters.categories.length > 0
              ? `${editingFilters.categories.length} sélectionnée(s)`
              : ""}
          </span>
          <Chevron open={isCategoryDropdownOpen} />
        </button>
        {isCategoryDropdownOpen && (
          <div className="absolute left-0 right-0 z-20 mt-1 w-full bg-white border border-blue-950/30 rounded-lg shadow-lg p-4">
            <Input
              type="text"
              placeholder="Rechercher..."
              className="w-full py-2 rounded-lg border-b mb-3"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
              {filteredCategories.map((category) => {
                const selected = editingFilters.categories.includes(
                  category.name
                );
                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`px-3 py-1 cursor-pointer rounded-full border text-sm transition-colors hover:bg-gray-300 hover:text-custom-blue-900 focus:outline-none
                      ${
                        selected
                          ? "bg-custom-blue-900 text-white border-custom-blue-900"
                          : "bg-gray-100 text-custom-blue-900 border-gray-300"
                      }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {capitalize(category.name)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div ref={tagDropdownRef} className="relative w-full">
        <button
          className="px-4 py-2 border border-blue-950/30 bg-white cursor-pointer hover:bg-blue-50 rounded-lg text-sm w-full text-left flex items-center justify-between transition-colors"
          onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
        >
          <span className="flex items-center gap-2">
            <TagIcon className="w-5 h-5 text-custom-blue-900" />
            Tags
          </span>
          <span className="truncate ml-2">
            {editingFilters.tags.length > 0
              ? `${editingFilters.tags.length} sélectionné(s)`
              : ""}
          </span>
          <Chevron open={isTagDropdownOpen} />
        </button>
        {isTagDropdownOpen && (
          <div className="absolute left-0 right-0 z-20 mt-1 w-full border-blue-950/30 bg-white border rounded-lg shadow-lg p-4">
            <Input
              type="text"
              placeholder="Rechercher..."
              className="w-full py-2 rounded-lg border-b mb-3"
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
              {filteredTags.map((tag) => {
                const selected = editingFilters.tags.includes(tag.name);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    className={`px-3 py-1 rounded-full cursor-pointer border text-sm transition-colors hover:bg-gray-300 hover:text-custom-blue-900 focus:outline-none 
                      ${
                        selected
                          ? "bg-custom-blue-900 text-white border-custom-blue-900"
                          : "bg-gray-100 text-custom-blue-900 border-gray-300"
                      }
                      `}
                    onClick={() => {
                      setEditing({
                        tags: selected
                          ? editingFilters.tags.filter((t) => t !== tag.name)
                          : [...editingFilters.tags, tag.name],
                      });
                      applyFilters();
                    }}
                  >
                    {capitalize(tag.name)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Niveaux */}
      <div ref={levelDropdownRef} className="relative w-full">
        <button
          className="px-4 rounded-lg text-sm cursor-pointer py-2 border border-blue-950/30 transition-all bg-white hover:bg-blue-50 w-full text-left flex items-center justify-between"
          onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
        >
          <span className="flex items-center gap-2">
            <AcademicCapIcon className="w-5 h-5 text-custom-blue-900" />
            Niveau
          </span>
          <span className="truncate ml-2">
            {editingFilters.levels.length > 0
              ? `${editingFilters.levels.length} sélectionné(s)`
              : ""}
          </span>
          <Chevron open={isLevelDropdownOpen} />
        </button>
        {isLevelDropdownOpen && (
          <div className="absolute left-0 right-0 z-20 mt-1 w-full border-blue-950/30 bg-white border rounded-lg shadow-lg p-4">
            <Input
              type="text"
              placeholder="Rechercher..."
              className="w-full py-2 rounded-lg border-b mb-3"
              value={levelSearch}
              onChange={(e) => setLevelSearch(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
              {filteredLevels.map((level) => {
                const selected = editingFilters.levels.includes(level);
                return (
                  <button
                    key={level}
                    type="button"
                    className={`px-3 py-1 cursor-pointer rounded-full border text-sm transition-colors hover:bg-gray-300 hover:text-custom-blue-900 focus:outline-none
                      ${
                        selected
                          ? "bg-custom-blue-900 text-white border-custom-blue-900"
                          : "bg-gray-100 text-custom-blue-900 border-gray-300"
                      }
                      `}
                    onClick={() => {
                      setEditing({
                        levels: selected
                          ? editingFilters.levels.filter((l) => l !== level)
                          : [...editingFilters.levels, level],
                      });
                      applyFilters();
                    }}
                  >
                    {capitalize(level)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Durée */}
      <div ref={durationDropdownRef} className="relative w-full">
        <button
          className="px-4 cursor-pointer py-2 border rounded-lg text-sm border-blue-950/30 transition-all bg-white hover:bg-blue-50 w-full text-left flex items-center justify-between"
          onClick={() => setIsDurationDropdownOpen(!isDurationDropdownOpen)}
        >
          <span className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-custom-blue-900" />
            Durée
          </span>
          <span className="truncate ml-2">
            {editingFilters.durations.length > 0
              ? `${editingFilters.durations.length} sélectionnée(s)`
              : ""}
          </span>
          <Chevron open={isDurationDropdownOpen} />
        </button>
        {isDurationDropdownOpen && (
          <div className="absolute left-0 right-0 z-20 mt-1 w-full border-blue-950/30 bg-white border rounded-lg shadow-lg">
            <div className="max-h-60 overflow-y-auto">
              {filteredDurations.map((dur) => (
                <div
                  key={dur}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setEditing({
                      durations: editingFilters.durations.includes(dur)
                        ? editingFilters.durations.filter((d) => d !== dur)
                        : [...editingFilters.durations, dur],
                    });
                    applyFilters();
                  }}
                >
                  <input
                    type="checkbox"
                    checked={editingFilters.durations.includes(dur)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {capitalize(dur)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Format */}
      <div ref={formatDropdownRef} className="relative w-full">
        <button
          className=" cursor-pointer rounded-lg text-sm px-4 py-2 border border-blue-950/30 transition-all bg-white hover:bg-blue-50 w-full text-left flex items-center justify-between"
          onClick={() => setIsFormatDropdownOpen(!isFormatDropdownOpen)}
        >
          <span className="flex items-center gap-2">
            <DeviceTabletIcon className="w-5 h-5 text-custom-blue-900" />
            Format
          </span>
          <span className="truncate ml-2">
            {editingFilters.formats.length > 0
              ? `${editingFilters.formats.length} sélectionné(s)`
              : ""}
          </span>
          <Chevron open={isFormatDropdownOpen} />
        </button>
        {isFormatDropdownOpen && (
          <div className="absolute left-0 right-0 z-20 mt-1 w-full bg-white border rounded-lg shadow-lg">
            <div className="max-h-60 overflow-y-auto">
              {filteredFormats.map((fmt) => (
                <div
                  key={fmt}
                  className="p-2 hover:bg-white cursor-pointer"
                  onClick={() => {
                    setEditing({
                      formats: editingFilters.formats.includes(fmt)
                        ? editingFilters.formats.filter((f) => f !== fmt)
                        : [...editingFilters.formats, fmt],
                    });
                    applyFilters();
                  }}
                >
                  <input
                    type="checkbox"
                    checked={editingFilters.formats.includes(fmt)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {capitalize(fmt)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Budget */}
      <div className="flex flex-col gap-4 w-full">
        <div className=" text-custom-blue-900 text-sm">€ Budget </div>
        <BudgetDoubleSlider
          min={0}
          max={5000}
          value={editingFilters.budget}
          onChange={handleBudgetChange}
        />
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="border rounded-lg px-4 py-2 border-blue-950/30 transition-all bg-white ">
            {editingFilters.budget[0]}€
          </span>
          <span>–</span>
          <span className="border rounded-lg px-4 py-2 border-blue-950/30 transition-all bg-white ">
            {editingFilters.budget[1]}€
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterFormation;
