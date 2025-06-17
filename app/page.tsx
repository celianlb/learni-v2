import Intervention from "@/components/cta/Intervention/Intervention";
import FAQ from "@/components/faq";
import HeroSection from "@/components/hero-section";
import Services from "@/components/services";
import More from "@/components/services/More";
import Testimonials from "@/components/testimonials";
import { TimelineSection } from "@/components/timeline";
import PartnersSection from "@/components/UI/Partners/PartnersSection";
import SectionTag from "@/components/UI/section-tag";
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

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="flex flex-col gap-24">
        <SectionTag />
        <PartnersSection />
      </div>
      <Services />
      <More />
      <Testimonials />
      <TimelineSection />
      <Intervention />
      <FAQ items={data} />
    </main>
  );
}
