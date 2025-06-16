import prisma from "@/lib/prisma";
import { FormationWithRelations } from "@/types/formation";
import Image from "next/image";
import FormationCard from "./formation-card";

async function getRandomFormations(): Promise<FormationWithRelations[]> {
  const formations = await prisma.formation.findMany({
    include: {
      category: true,
      tags: true,
      programme: true,
    },
  });

  return formations.sort(() => Math.random() - 0.5).slice(0, 3);
}

export default async function Top3Formations() {
  const top3Formations = await getRandomFormations();

  return (
    <section className="flex flex-row gap-16 items-center justify-center mb-48 mt-48">
      <div className="flex flex-col gap-16 w-fit">
        <h2 className=" font-manrope text-[28px] md:text-[32px] leading-tight">
          <span className="font-extrabold">Top 3 </span>
          des formations actuelles
        </h2>
        <div className="flex flex-col gap-4">
          {top3Formations.map((formation) => (
            <FormationCard
              key={formation.slug}
              formation={formation}
              variant="auto"
            />
          ))}
        </div>
      </div>
      <Image
        src="/assets/human-formation.png"
        alt="Arrow right"
        width={578}
        height={664}
        className="hidden sm:block"
      />
    </section>
  );
}
