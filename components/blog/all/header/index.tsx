import { notFound } from "next/navigation";
import Social from "./social";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function HeroSectionBlog({ article }: { article: any[] }) {
  if (!article || article.length === 0) {
    notFound();
  }

  return (
    <section className="bg-white rounded-b-3xl lg:rounded-b-[42px] relative overflow-hidden flex flex-col justify-between">
      {article.map((art) => (
        <div key={art.id} className="flex flex-col gap-8 md:gap-24">
          <div>
            <h1 className="text-4xl mb-6 text-archia text-customBlue-900">
              {art.titre}
            </h1>
            <p className="text-xl text-customBlue-900">{art.description}</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-8 items-start md:items-center">
            <div className="flex flex-col md:flex-row lg:flex-col gap-2">
              <div className="flex items-center gap-2">
                <strong>{art.auteur.nom}</strong>
              </div>
              <div className="flex items-center italic gap-2">
                {art.auteur.bio}
              </div>
            </div>
          </div>
          <div>
            <div>
              Date publication :{" "}
              <strong>
                {new Date(art.date_publication).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
            </div>
            <div>
              Temps de lecture : <strong>{art.temps_lecture} min</strong>
            </div>
          </div>

          <Social title={art.titre} description={art.description} />
        </div>
      ))}
    </section>
  );
}
