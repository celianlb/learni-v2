import Card from "@/components/UI/Card/Card";
import { getOneFormation } from "@/queries/getFormation";
import { notFound } from "next/navigation";

interface ProgrammeDay {
  day: number;
  title: string;
  content: string[];
}

interface FormationProgramme {
  objectives: string[];
  programme: ProgrammeDay[];
  evaluationMethods: string[];
  learningMethods: string[];
}

export default async function ProgrammeFormationSection({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formation = await getOneFormation(slug);

  if (!formation) {
    notFound();
  }

  // Convertir les données de la base de données en format attendu par le composant
  const formationProgramme: FormationProgramme = {
    objectives: formation.objectifs || [],
    programme:
      formation.programme?.map(
        (day: { titre: string; contenu: string }, index: number) => ({
          day: index + 1,
          title: day.titre || `Jour ${index + 1}`,
          content: day.contenu.split("\n").filter(Boolean), // Convertir le contenu en tableau de strings
        })
      ) || [],
    evaluationMethods: formation.evaluation || [],
    learningMethods: formation.apprentissage || [],
  };

  return (
    <>
      {/* Section Objectifs */}
      <section className="mb-12">
        <Card
          className="p-8 text-white w-auto bg-[#18174A]"
          backgroundType="radial"
          borderType="gradient"
        >
          <h2 className="text-white font-semibold font-manrope text-[18px]">
            Objectifs de la formation
          </h2>
          <ul className=" space-y-4 text-white opacity-80 font-work-sans">
            {formationProgramme.objectives.map(
              (objective: string, index: number) => (
                <li key={index} className="text-[16px]  text-white/90">
                  {objective}
                </li>
              )
            )}
          </ul>
        </Card>
      </section>

      {/* Section Détail de la formation */}
      <section className="text-white flex flex-col gap-12 -z-10">
        {/* Programme - Timeline */}
        <h2 className="text-[32px] text-custom-blue-900 font-manrope font-semibold tracking-wide">
          Programme
        </h2>
        <div className="relative flex flex-col gap-12 pl-10">
          {/* Ligne verticale */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-blue-900 to-blue-200"></div>
          {formationProgramme.programme.map((day: ProgrammeDay) => (
            <div key={day.day} className="relative flex items-start">
              {/* Point de la timeline aligné avec le texte */}
              <div className="absolute -left-[49px] top-8 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-900"></div>
              </div>
              {/* Bloc texte principal */}
              <div className="flex flex-col gap-8 mt-5">
                <div className="flex flex-col md:flex-row items-baseline gap-4 ">
                  <span className="text-[24px] shrink-0 font-archivo font-semibold text-custom-blue-900 leading-none">
                    Jour {day.day}
                  </span>
                  <span className="text-[16px] font-light  font-work-sans text-custom-blue-900 lowercase">
                    {day.title}
                  </span>
                </div>
                <ul className="list-disc pl-6 space-y-4">
                  {day.content.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="font-work-sans text-custom-blue-900 opacity-80 tracking-tight"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Méthode d'évaluation */}
        <div className="relative flex flex-col gap-6">
          <h2 className="text-[32px] text-custom-blue-900 font-manrope font-semibold tracking-wide">
            Méthode d&apos;évaluation
          </h2>
          <div className="relative pl-10 flex w-fit">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-blue-900 to-blue-200"></div>
            <ul
              className="
             py-6 gap-6 flex flex-col"
            >
              {formationProgramme.evaluationMethods.map(
                (method: string, i: number) => (
                  <li
                    key={i}
                    className="font-work-sans text-custom-blue-900 opacity-80 tracking-tight"
                  >
                    {method}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Méthode d'apprentissage */}
        <div className="relative flex flex-col gap-6">
          <h2 className="text-[32px] text-custom-blue-900 font-manrope font-semibold tracking-wide">
            Méthode d&apos;apprentissage
          </h2>
          <div className="relative pl-10 flex w-fit">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-blue-900 to-blue-200"></div>
            <ul className=" py-6 gap-6 flex flex-col">
              {formationProgramme.learningMethods.map(
                (method: string, i: number) => (
                  <li
                    key={i}
                    className="font-work-sans tracking-tight text-custom-blue-900 opacity-80"
                  >
                    {method}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
