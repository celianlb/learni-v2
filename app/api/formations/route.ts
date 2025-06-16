import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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

    return NextResponse.json(formations);
  } catch (error) {
    console.error("Erreur lors de la récupération des formations:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des formations" },
      { status: 500 }
    );
  }
}
