// app/sitemap.xml/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Optionnel: forcer ce routeur à être toujours dynamique (pas de mise en cache statique)
export const dynamic = "force-dynamic";

export async function GET() {
  // 1. Calculer le nombre de sitemaps nécessaires
  const totalArticle = await prisma.article.count();
  const totalFormations = await prisma.formation.count();
  const maxUrlsPerFile = 20000;
  const sitemapCount = Math.ceil(
    totalFormations + totalArticle / maxUrlsPerFile
  );

  // 2. Construire le XML de l'index de sitemaps
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  for (let i = 0; i < sitemapCount; i++) {
    xml += "<sitemap>";
    xml += `<loc>${baseUrl}/sitemaps/${i}.xml</loc>`;
    // Optionnel: ajouter la date de dernière modif de ce sitemap
    // xml += `<lastmod>${new Date().toISOString()}</lastmod>`;
    xml += "</sitemap>";
  }
  xml += "</sitemapindex>";

  // 3. Retourner la réponse XML
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
