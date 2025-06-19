import prisma from "@/lib/prisma";
import { FormationWithRelations } from "@/types/formation";

export async function searchFormations(
  query?: string
): Promise<FormationWithRelations[]> {
  try {
    if (!query) {
      const allFormations = await prisma.formation.findMany({
        include: {
          category: true,
          tags: true,
          programme: {
            orderBy: {
              jour: "asc",
            },
          },
        },
      });
      return allFormations;
    }

    const formations = await prisma.formation.findMany({
      where: {
        OR: [
          { titre: { contains: query, mode: "insensitive" } },
          { objectifs: { hasSome: [query] } },
          { prerequis: { contains: query, mode: "insensitive" } },
          { public: { contains: query, mode: "insensitive" } },
          {
            tags: { some: { name: { contains: query, mode: "insensitive" } } },
          },
          {
            programme: {
              some: { contenu: { contains: query, mode: "insensitive" } },
            },
          },
        ],
      },
      include: {
        category: true,
        tags: true,
        programme: {
          orderBy: {
            jour: "asc",
          },
        },
      },
    });

    return formations;
  } catch (error) {
    console.error("Erreur lors de la recherche des formations:", error);
    throw error;
  }
}
