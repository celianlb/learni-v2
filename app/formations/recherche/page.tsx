import { Metadata } from "next";
import SearchResultsContent from "./SearchResultsContent";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q: query } = await searchParams;

  if (query) {
    return {
      title: `Recherche: "${query}" - Formations | Learni`,
      description: `Découvrez nos formations correspondant à votre recherche "${query}". Trouvez la formation idéale pour développer vos compétences.`,
      keywords: [
        `formation ${query}`,
        `formation professionnelle ${query}`,
        `apprentissage ${query}`,
      ],
      openGraph: {
        title: `Recherche: "${query}" - Formations | Learni`,
        description: `Découvrez nos formations correspondant à votre recherche "${query}". Trouvez la formation idéale pour développer vos compétences.`,
        type: "website",
      },
    };
  }

  return {
    title: "Recherche de formations - Learni",
    description:
      "Recherchez parmi nos formations professionnelles. Trouvez la formation idéale pour développer vos compétences et faire évoluer votre carrière.",
    keywords: [
      "formations",
      "formation professionnelle",
      "apprentissage",
      "développement de compétences",
    ],
    openGraph: {
      title: "Recherche de formations - Learni",
      description:
        "Recherchez parmi nos formations professionnelles. Trouvez la formation idéale pour développer vos compétences et faire évoluer votre carrière.",
      type: "website",
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { q: query } = await searchParams;

  // Données structurées JSON-LD pour le SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: query
      ? `Recherche: "${query}" - Formations`
      : "Recherche de formations",
    description: query
      ? `Découvrez nos formations correspondant à votre recherche "${query}". Trouvez la formation idéale pour développer vos compétences.`
      : "Recherchez parmi nos formations professionnelles. Trouvez la formation idéale pour développer vos compétences et faire évoluer votre carrière.",
    url: query
      ? `https://learni.fr/formations/recherche?q=${encodeURIComponent(query)}`
      : "https://learni.fr/formations/recherche",
    mainEntity: {
      "@type": "ItemList",
      name: "Formations",
      description: "Liste des formations disponibles",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SearchResultsContent searchParams={searchParams} />
    </>
  );
}
