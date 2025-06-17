"use client";

import { useState } from "react";
import BlogCard from "./blog-card";

interface Article {
  titre: string;
  slug: string;
  categories: { nom: string }[];
}

interface Props {
  article: Article[];
}

const CorpsBlog = ({ article }: Props) => {
  // Récupérer les catégories uniques
  const categories = [
    ...new Set(
      article.flatMap((a) => a.categories.map((c: { nom: string }) => c.nom))
    ),
  ];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="relative">
      <div className="flex flex-col gap-8 mb-12">
        <h2 className="text-white text-2xl font-archivo font-bold">
          Filtrer par catégorie
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-white transition-all duration-300 ${
              selectedCategory === null
                ? "bg-customBlue-900"
                : "bg-customBlue-800 hover:bg-customBlue-700"
            }`}
          >
            Tous
          </button>
          {categories.map((categorie: string) => (
            <button
              key={categorie}
              onClick={() => setSelectedCategory(categorie)}
              className={`px-4 py-2 rounded-lg text-white transition-all duration-300 ${
                selectedCategory === categorie
                  ? "bg-customBlue-900"
                  : "bg-customBlue-800 hover:bg-customBlue-700"
              }`}
            >
              {categorie}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-20">
        {categories
          .filter(
            (categorie) =>
              selectedCategory === null || categorie === selectedCategory
          )
          .map((categorie) => {
            const articlesParCategorie = article.filter((a) =>
              a.categories?.some((c: { nom: string }) => c.nom === categorie)
            );

            return (
              <div key={categorie} className="space-y-8">
                <h2 className="text-white text-2xl font-archivo font-bold">
                  {categorie}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
                  {articlesParCategorie.map((article) => (
                    <div key={article.slug}>
                      <BlogCard article={article} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default CorpsBlog;
