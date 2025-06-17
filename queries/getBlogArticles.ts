import prisma from "@/lib/prisma";

export async function getBlogArticles() {
  return prisma.article.findMany({
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
}
