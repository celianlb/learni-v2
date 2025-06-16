import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

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
      return NextResponse.json(allFormations);
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

    return NextResponse.json(formations);
  } catch (error) {
    console.error("Erreur lors de la recherche des formations:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la recherche des formations",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
