import { getAllCategories } from "@/queries/getCategories";
import { getFormationByCategory } from "@/queries/getFormationByCategory";
import { FormationWithRelations } from "@/types/formation";
import Image from "next/image";
import Link from "next/link";
import FormationCard from "./formation-card";

export default async function SectionAllFormations() {
  try {
    const categories = await getAllCategories();

    const formationsByCategory = await Promise.all(
      categories.map(async (category: { slug: string }) => {
        const formations = await getFormationByCategory(category.slug);
        return { category: category.slug, formations };
      })
    );

    const formationsMap = formationsByCategory.reduce(
      (
        acc: { [key: string]: FormationWithRelations[] },
        {
          category,
          formations,
        }: { category: string; formations: FormationWithRelations[] }
      ) => {
        acc[category] = formations;
        return acc;
      },
      {} as { [key: string]: FormationWithRelations[] }
    );

    return (
      <section className="relative" id="formations">
        <div className="space-y-20">
          {categories
            .slice(0, 6)
            .map((category: { id: number; name: string; slug: string }) => {
              const categoryFormations = formationsMap[category.slug] || [];
              if (categoryFormations.length === 0) return null;

              return (
                <div key={category.id} className="space-y-8">
                  <h3 className="text-custom-blue-900 font-work-sans tracking-[-1px] font-medium text-[24px]">
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
                    {categoryFormations
                      .slice(0, 4)
                      .map((formation: FormationWithRelations) => (
                        <div key={formation.slug}>
                          <FormationCard formation={formation} />
                        </div>
                      ))}
                  </div>
                  <div className="flex items-center justify-end gap-2 group w-full">
                    <Link
                      href={"/formations/tous-les-domaines"}
                      className="font-archivo text-[18px] font-light  group-hover:text-gray-400 transition-all duration-300"
                    >
                      Voir tout
                    </Link>
                    <Image
                      width={24}
                      height={24}
                      src={"/svg/arrow.svg"}
                      alt="tous les domaines d'interventions"
                      className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Erreur lors du chargement des formations:", error);
    return (
      <section>
        <div className="text-white text-center">
          Une erreur est survenue lors du chargement des formations
        </div>
      </section>
    );
  }
}
