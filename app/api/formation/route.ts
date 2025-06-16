import prisma from "@/lib/prisma";
import { getAllFormations } from "@/queries/getFormation";
import { NextResponse } from "next/server";

// GET /api/formation
export async function GET() {
  try {
    console.log("Début de la requête GET /api/formation");
    const formations = await getAllFormations();
    console.log("Formations récupérées:", formations);

    if (!formations || formations.length === 0) {
      console.log("Aucune formation trouvée");
      return NextResponse.json([]);
    }

    // Vérification de la structure des données
    const firstFormation = formations[0];
    console.log("Structure de la première formation:", {
      id: firstFormation.id,
      titre: firstFormation.titre,
      slug: firstFormation.slug,
      hasCategory: !!firstFormation.category,
      hasTags: firstFormation.tags.length > 0,
      hasProgramme: firstFormation.programme.length > 0,
    });

    return NextResponse.json(formations);
  } catch (error) {
    console.error(
      "Erreur détaillée lors de la récupération des formations:",
      error
    );
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération des formations",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

// POST /api/formation
export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Le slug est requis" },
        { status: 400 }
      );
    }

    const formation = await prisma.formation.findUnique({
      where: {
        slug: slug,
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

    if (!formation) {
      return NextResponse.json(
        { error: "Formation non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(formation);
  } catch (error) {
    console.error("Erreur lors de la récupération de la formation:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération de la formation",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
