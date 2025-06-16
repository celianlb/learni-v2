"use client";
import Button from "@/components/ui/Button/Button";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// Fonction pour normaliser les caractères accentués
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default function SearchBar() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsModalOpen(false);
    router.push(`/formations/recherche?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  // Filtrer les tags en fonction de la saisie
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return allTags;

    const normalizedQuery = normalizeString(searchQuery);
    return allTags.filter((tag) =>
      normalizeString(tag).includes(normalizedQuery)
    );
  }, [searchQuery, allTags]);

  useEffect(() => {
    const fetchSuggestedTags = async () => {
      try {
        const response = await fetch("/api/formation/tags");
        const data = await response.json();
        setAllTags(data);
        setSuggestedTags(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tags:", error);
      }
    };

    if (isModalOpen) {
      fetchSuggestedTags();
    }
  }, [isModalOpen]);

  // Mettre à jour les tags suggérés quand la recherche change
  useEffect(() => {
    setSuggestedTags(filteredTags);
  }, [filteredTags]);

  return (
    <div className="relative">
      <div className="relative z-20">
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <span>Rechercher une formation</span>
        </Button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-900/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto py-8"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white p-6 rounded-xl w-full max-w-[750px] mx-4 my-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Rechercher</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Recherchez votre formation"
                    className="w-full border-[1px] border-customBlue-900 border-opacity-20 rounded-xl p-4 shadow-inner pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="relative z-20">
                  <Button
                    onClick={handleSearch}
                    className="h-full"
                    variant="primary"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    <span>Rechercher</span>
                  </Button>
                </div>
              </div>

              {suggestedTags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    {searchQuery.trim()
                      ? `Suggestions pour "${searchQuery}"`
                      : "Suggestions populaires"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full text-sm text-gray-700 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
