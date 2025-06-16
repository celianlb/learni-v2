import prisma from "@/lib/prisma";

export async function getAllFormations() {
  try {
    const formations = await prisma.formation.findMany({
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
    throw error;
  }
}

export async function getOneFormation(slug: string) {
  try {
    const formation = await prisma.formation.findUnique({
      where: { slug },
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
    return formation;
  } catch (error) {
    throw error;
  }
}
