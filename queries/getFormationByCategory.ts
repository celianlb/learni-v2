import prisma from "@/lib/prisma";
import { FormationWithRelations } from "@/types/formation";

export async function getFormationByCategory(
  categorySlug: string
): Promise<FormationWithRelations[]> {
  try {
    const formations = await prisma.formation.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
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
      take: 10,
    });
    return formations;
  } catch (error) {
    throw error;
  }
}
