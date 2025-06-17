import FormationCard from "@/components/formation/formation-card";
import { getAllCategories } from "@/queries/getCategories";
import { getFormationByCategory } from "@/queries/getFormationByCategory";
import { notFound } from "next/navigation";
import HeroCategory from "./hero-section";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const categories = await getAllCategories();
  const slug = (await params).slug;
  const category = categories.find(
    (cat: { id: number; name: string; slug: string }) => cat.slug === slug
  );

  if (!category) {
    notFound();
  }

  const formations = await getFormationByCategory(category.slug);

  return (
    <div>
      <HeroCategory category={category} />
      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-8">Formations disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <FormationCard
              key={formation.slug}
              formation={formation}
              variant="default"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
