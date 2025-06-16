import { getFormationByCategory } from "@/queries/getFormationByCategory";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Récupérer la catégorie depuis l'URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Le paramètre 'category' est requis" },
        { status: 400 }
      );
    }

    console.log(
      `Requête GET /api/formation/category pour la catégorie: ${category}`
    );

    const formations = await getFormationByCategory(category);

    if (!formations || formations.length === 0) {
      console.log(`Aucune formation trouvée pour la catégorie: ${category}`);
      return NextResponse.json([]);
    }

    return NextResponse.json(formations);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des formations par catégorie:",
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
