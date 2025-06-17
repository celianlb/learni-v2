import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // Attendre la résolution de la promesse

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const xmlUrls: string[] = [];

  const prisma = new PrismaClient();

  const results = await prisma.formation.findMany({
    skip: Number(slug) == 1 ? 0 : (Number(slug) - 1) * 10000,
    take: 10000,
    orderBy: {
      id: "asc",
    },
  });

  const article = await prisma.article.findMany({
    skip: Number(slug) == 1 ? 0 : (Number(slug) - 1) * 10000,
    take: 10000,
    orderBy: {
      id: "asc",
    },
  });

  for (const result of results) {
    xmlUrls.push(`
          <url>
            <loc>${baseUrl}/blog/${result.slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>`);
  }

  for (const a of article) {
    xmlUrls.push(`
        <url>
          <loc>${baseUrl}/blog/${a.slug}</loc>
          <lastmod>${new Date(a.datePublished).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlUrls.join("\n")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
