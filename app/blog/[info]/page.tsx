/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogBody from "@/components/blog/all/corps";
import HeroSectionBlog from "@/components/blog/all/header";
import FAQ from "@/components/faq";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const getBlog = async (info: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?slug=${info}`, // <-- correction ici si ton API accepte le slug
    {
      next: { revalidate: 60 }, // ← si tu veux activer l'ISR
    }
  );

  const data = await response.json();
  return data;
};

// Métadonnées dynamiques pour SEO
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { info } = await params;
  const article = await getBlog(info);

  if (!article) {
    notFound();
  }

  return {
    title: article.meta.titre_seo,
    description: article.meta.description_seo,
    keywords: article.meta.keywords,
    openGraph: {
      title: article.meta.titre_seo,
      description: article.meta.description_seo,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.auteur?.nom ?? "Learni"],
      tags: article.tags,
    },
  };
}

const data = [
  {
    question:
      "Quels sont les avantages de rejoindre Learni en tant que formateur ?",
    answer:
      "En rejoignant Learni, vous bénéficiez d'une flexibilité dans vos interventions, d'un accompagnement pédagogique, d'un accès à nos ressources certifiées Qualiopi, ainsi qu'à une communauté de formateurs engagés et bienveillants.",
  },
  {
    question: "Comment financer une formation chez Learni ?",
    answer:
      "Nos formations sont éligibles aux financements des OPCO, de Pôle Emploi ou encore au plan de développement des compétences. Nous vous accompagnons dans les démarches administratives.",
  },
  {
    question: "Les formations sont-elles certifiantes ?",
    answer:
      "Oui, Learni propose des formations certifiantes reconnues par l’État et inscrites au Répertoire Spécifique ou au RNCP. Chaque parcours peut aboutir à une certification selon les modalités prévues.",
  },
  {
    question:
      "Les formations sont-elles accessibles aux personnes en situation de handicap ?",
    answer:
      "Oui. Nos formations sont accessibles avec des adaptations spécifiques selon les besoins. Nous nous engageons pour une pédagogie inclusive. Contactez-nous pour un entretien de positionnement.",
  },
  {
    question: "Où ont lieu les formations ?",
    answer:
      "Les formations peuvent être suivies en présentiel dans nos locaux partenaires, à distance en visioconférence, ou en format hybride selon les programmes proposés.",
  },
  {
    question: "Quel est le public visé par vos formations ?",
    answer:
      "Nos formations s’adressent aux salariés, demandeurs d’emploi, entrepreneurs, reconversions professionnelles et étudiants souhaitant renforcer leurs compétences techniques ou transversales.",
  },
  {
    question: "Comment s’inscrire à une formation ?",
    answer:
      "Vous pouvez vous inscrire en ligne via notre formulaire d’inscription ou nous contacter directement. Un conseiller pédagogique vous rappellera pour valider vos attentes et besoins.",
  },
  {
    question: "Proposez-vous des formations sur mesure pour les entreprises ?",
    answer:
      "Oui. Nous concevons des formations 100% personnalisées selon vos objectifs, métiers, outils ou secteur d’activité. Une offre clé-en-main ou co-construite peut être mise en place.",
  },
  {
    question: "Comment se déroule l’évaluation en fin de formation ?",
    answer:
      "Une évaluation est réalisée en fin de parcours : quiz, cas pratiques, mises en situation, ainsi qu’un questionnaire de satisfaction à chaud et à froid. Un certificat est remis aux participants.",
  },
  {
    question: "Proposez-vous un accompagnement après la formation ?",
    answer:
      "Oui. Nous assurons un suivi post-formation (coaching, mentorat, forum d’échange, mise en réseau, ou support technique) pour garantir la mise en pratique concrète des acquis.",
  },
];

const Page = async ({ params }: any) => {
  // Extraction directe du slug
  const { info } = await params;

  // Récupération de l'article
  const article = await getBlog(info);

  // Redirection vers la page 404 si non trouvé
  if (!article) {
    notFound();
  }

  return (
    <main>
      <HeroSectionBlog article={article} />
      <BlogBody article={article} />
      <FAQ items={data} />
    </main>
  );
};

export default Page;
