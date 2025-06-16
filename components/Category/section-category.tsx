import { getAllCategories } from "@/queries/getCategories";
import Image from "next/image";
import Link from "next/link";
import AllCategory from "./all-category";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default async function CategorySection() {
  const categoriesData = await getAllCategories();
  const formattedCategories = categoriesData.map((cat: Category) => ({
    id: cat.id,
    title: cat.name,
    slug: cat.slug,
  }));

  return (
    <section className="relative overflow-hidden">
      <Image
        width={1500}
        height={1500}
        src={"/svg/dot-circle.svg"}
        alt="logo"
        className="object-cover absolute w-full h-full bottom-96 left-0 opacity-30"
      />
      <h2 className="text-white">Les domaines d&apos;interventions</h2>
      <AllCategory categories={formattedCategories} />
      <div className="flex items-center justify-end gap-2 group w-full">
        <Link
          href={"/formations/tous-les-domaines"}
          className="font-archivo text-[18px] font-light text-white group-hover:text-gray-400 transition-all duration-300"
        >
          Voir tous les domaines d&apos;interventions
        </Link>
        <Image
          width={24}
          height={24}
          src={"/svg/arrow.svg"}
          alt="tous les domaines d'interventions"
          className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
        />
      </div>
    </section>
  );
}
