import CategorySection from "@/components/category/section-category";
import Intervention from "@/components/cta/Intervention/Intervention";
import FAQ from "@/components/faq";
import { Metadata } from "next";

import SectionAllFormations from "@/components/formation/section-all-formations";
import Top3Formations from "@/components/formation/section-top3-formations";
import Hero from "../../components/formation/hero-section";

export const metadata: Metadata = {
  title: "Les formations - Learni",
  description:
    "Découvrez toutes les formations de Learni, une délégation de formateurs qualifiés pour votre école, on vous accompagne dans votre projet de formation, dans les démarches administratives, et dans la gestion de votre centre de formation",
};

const data = [
  {
    question:
      "Quels sont les avantages de rejoindre Learni en tant que formateur ?",
    answer:
      "En rejoignant Learni, vous intégrez un réseau d’experts valorisés et accompagnés. Nous vous proposons des missions adaptées à votre domaine, une rémunération juste, et un suivi personnalisé pour vous permettre de vous concentrer sur ce que vous faites de mieux : transmettre vos compétences.",
  },
  {
    question: "Comment Learni sélectionne-t-elle ses formateurs ?",
    answer:
      "Chaque formateur passe par un processus de sélection rigoureux, incluant un entretien, une vérification des compétences techniques et pédagogiques, ainsi qu’une mise en situation. Nous nous assurons ainsi de confier à nos clients des profils fiables, qualifiés et alignés avec leurs attentes.",
  },
  {
    question: "Quels types de formations propose Learni ?",
    answer:
      "Learni propose des formations professionnelles sur mesure, adaptées aux besoins des entreprises et des établissements d’enseignement. Nos domaines couvrent un large spectre : digital, management, soft skills, développement web, communication, et bien plus encore.",
  },
  {
    question: "Pourquoi faire appel à Learni pour former vos équipes ?",
    answer:
      "Parce que nous plaçons l’expertise au cœur de notre démarche. Nos formateurs sont sélectionnés pour leur savoir-faire terrain et leur capacité à transmettre efficacement. Nous construisons des parcours pédagogiques pertinents, directement connectés aux enjeux de votre structure.",
  },
];

export default function Formations() {
  return (
    <main>
      <Hero />
      <CategorySection />
      <Top3Formations />
      <SectionAllFormations />
      <Intervention />
      <FAQ items={data} />
    </main>
  );
}
