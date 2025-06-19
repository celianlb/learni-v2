import { getOneFormation } from "@/queries/getFormation";
import { Metadata } from "next";
import ContactFormFormation from "./contact-form-formation";
import HeroSectionFormation from "./hero-section";
import ProgrammeFormationSection from "./programme-formation-section";
import SuggestedFormation from "./suggested-formation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const formation = await getOneFormation(slug);

    if (!formation) {
      return {
        title: "Formation non trouvée",
        description: "La formation demandée n'existe pas.",
      };
    }

    return {
      title: `${formation.titre} - Formation | Learni`,
      description:
        formation.objectifs?.join(" ") ||
        `Découvrez notre formation ${formation.titre}. Développez vos compétences avec Learni.`,
      keywords: [
        formation.titre,
        "formation",
        "formation professionnelle",
        formation.niveau,
        formation.format,
        ...(formation.tags?.map((tag) => tag.name) || []),
        ...(formation.category ? [formation.category.name] : []),
      ],
      openGraph: {
        title: `${formation.titre} - Formation | Learni`,
        description:
          formation.objectifs?.join(" ") ||
          `Découvrez notre formation ${formation.titre}. Développez vos compétences avec Learni.`,
        type: "website",
        url: `https://learni.fr/formations/${slug}`,
        images: [
          {
            url: "https://learni.fr/og-formation.jpg", // Image par défaut pour les formations
            width: 1200,
            height: 630,
            alt: formation.titre,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${formation.titre} - Formation | Learni`,
        description:
          formation.objectifs?.join(" ") ||
          `Découvrez notre formation ${formation.titre}.`,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la génération des métadonnées:", error);
    return {
      title: "Formation - Learni",
      description: "Découvrez nos formations professionnelles.",
    };
  }
}

export default async function FormationPage({ params }: PageProps) {
  const { slug } = await params;

  // Données structurées JSON-LD pour la formation
  const formation = await getOneFormation(slug);

  const jsonLd = formation
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: formation.titre,
        description:
          formation.objectifs?.join(" ") || `Formation ${formation.titre}`,
        provider: {
          "@type": "Organization",
          name: "Learni",
          url: "https://learni.fr",
        },
        courseMode: formation.format,
        educationalLevel: formation.niveau,
        timeRequired: formation.duree,
        inLanguage: formation.langue,
        url: `https://learni.fr/formations/${slug}`,
        category: formation.category?.name,
        keywords: formation.tags?.map((tag) => tag.name).join(", "),
        audience: {
          "@type": "Audience",
          audienceType: formation.public,
        },
        offers: {
          "@type": "Offer",
          price: formation.tarifIndividuel.replace(/[^0-9]/g, ""),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <main>
        <HeroSectionFormation params={params} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <div className="order-1 pt-14 lg:pt-32">
            <ProgrammeFormationSection params={Promise.resolve(params)} />
          </div>
          <div className="order-2 lg:sticky lg:top-4 lg:self-start  lg:pt-32">
            <ContactFormFormation />
          </div>
        </div>
        <SuggestedFormation currentSlug={slug} />
      </main>
    </>
  );
}
