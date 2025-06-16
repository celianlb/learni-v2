import { getAllFormations } from "@/queries/getFormation";
import { FormationWithRelations } from "@/types/formation";
import FormationCard from "../Formation/formation-card";

interface SuggestedFormationProps {
  currentSlug: string;
}

export default async function SuggestedFormation({
  currentSlug,
}: SuggestedFormationProps) {
  // Récupérer toutes les formations depuis la DB
  const formations = await getAllFormations();

  // Trouver la formation actuelle
  const currentFormation = formations.find(
    (f: FormationWithRelations) => f.slug === currentSlug
  );

  if (!currentFormation) {
    return null;
  }

  // Fonction pour calculer la similarité entre deux formations
  const calculateSimilarity = (
    formation1: FormationWithRelations,
    formation2: FormationWithRelations
  ) => {
    let score = 0;

    // Vérifier les tags communs
    const commonTags = formation1.tags.filter((tag: { name: string }) =>
      formation2.tags.some((t: { name: string }) => t.name === tag.name)
    );
    score += commonTags.length * 2;

    // Vérifier le format de formation
    if (formation1.format === formation2.format) {
      score += 1;
    }

    // Vérifier le niveau
    if (formation1.niveau === formation2.niveau) {
      score += 1;
    }

    // Vérifier la durée (proche)
    const duration1 = parseInt(formation1.duree);
    const duration2 = parseInt(formation2.duree);
    if (!isNaN(duration1) && !isNaN(duration2)) {
      const durationDiff = Math.abs(duration1 - duration2);
      if (durationDiff <= 2) {
        score += 1;
      }
    }

    return score;
  };

  // Trouver les formations similaires
  const suggestedFormations = formations
    .filter((f: FormationWithRelations) => f.slug !== currentSlug) // Exclure la formation actuelle
    .map((formation: FormationWithRelations) => ({
      ...formation,
      similarityScore: calculateSimilarity(currentFormation, formation),
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore) // Trier par score de similarité
    .slice(0, 4); // Prendre les 4 plus similaires

  if (suggestedFormations.length === 0) {
    return null;
  }

  return (
    <section className="my-36">
      <h2 className="text-custom-blue-900 font-manrope font-semibold text-[32px] mb-12">
        Ces formations pourraient vous plaire
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestedFormations.map(
          (formation: FormationWithRelations & { similarityScore: number }) => (
            <FormationCard
              key={formation.slug}
              formation={formation}
              variant="default"
            />
          )
        )}
      </div>
    </section>
  );
}
