import prisma from "@/lib/prisma";

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            formations: true,
          },
        },
      },
    });
    return categories;
  } catch (error) {
    throw error;
  }
}
