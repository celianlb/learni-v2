import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const article = await prisma.article.findMany({
      include: {
        AuteurArticle: true,
        MetaArticle: true,
        CategoryArticle: true,
        TagArticle: true,
        ContenuStructureArticle: {
          include: {
            ItemArticle: true,
          },
        },
      },
      take: 1000,
    });

    return NextResponse.json(article, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
