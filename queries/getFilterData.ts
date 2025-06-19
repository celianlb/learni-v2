import prisma from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return [];
  }
}

export async function getTags() {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        categoryId: true,
      },
      distinct: ["name"],
      orderBy: {
        name: "asc",
      },
    });
    return tags;
  } catch (error) {
    console.error("Erreur lors de la récupération des tags:", error);
    return [];
  }
}

export async function getFormationFilterData() {
  try {
    const formations = await prisma.formation.findMany({
      select: {
        niveau: true,
        duree: true,
        format: true,
      },
    });

    // Normalisation des durées
    const normalizeDuration = (duree: string) => {
      if (!duree) return null;
      const d = duree.toLowerCase().replace(/\s/g, "");
      if (d.startsWith("1j")) return "1 jour";
      if (d.startsWith("2j")) return "2 jours";
      if (d.startsWith("3j")) return "3 jours";
      return duree;
    };

    const uniqueLevels = Array.from(
      new Set(formations.map((f) => f.niveau))
    ).filter(Boolean) as string[];

    const uniqueDurations = Array.from(
      new Set(formations.map((f) => normalizeDuration(f.duree)).filter(Boolean))
    ).filter((d): d is string => typeof d === "string");

    const uniqueFormats = Array.from(
      new Set(formations.map((f) => f.format))
    ).filter(Boolean) as string[];

    return {
      levels: uniqueLevels,
      durations: uniqueDurations,
      formats: uniqueFormats,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de filtres:",
      error
    );
    return {
      levels: [],
      durations: [],
      formats: [],
    };
  }
}
