import CorpsBlog from "@/components/blog/all/corps";
import HeroSectionBlog from "@/components/blog/all/header";
import { getBlogArticles } from "@/queries/getBlogArticles";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Le blog de Learni – Formation professionnelle, reconversion & actualités",
    description:
      "Explorez des articles de fond, des conseils carrière, et les dernières tendances en formation professionnelle. Restez informé sur les innovations pédagogiques, la reconversion, le financement, et les actualités de Learni.",
    keywords: [
      "formation professionnelle",
      "reconversion professionnelle",
      "financement formation",
      "éducation supérieure",
      "actualité pédagogique",
      "opco",
      "certification qualiopi",
      "formation en entreprise",
      "Learni",
    ],
    openGraph: {
      title:
        "Formation professionnelle & innovation pédagogique – Le blog de Learni",
      description:
        "Découvrez les meilleures pratiques, outils pédagogiques, et solutions de formation pour accompagner votre montée en compétences.",
      type: "article",
      authors: ["Équipe Learni"],
      tags: [
        "formation",
        "reconversion",
        "apprentissage",
        "financement",
        "opco",
        "learni",
      ],
    },
  };
}

export default async function Page() {
  const rawArticles = await getBlogArticles();
  const article = rawArticles.map((a) => ({
    ...a,
    categories: a.CategoryArticle,
    auteur: a.AuteurArticle,
  }));

  return (
    <main>
      <HeroSectionBlog article={article} />
      <CorpsBlog article={article} />
    </main>
  );
}
