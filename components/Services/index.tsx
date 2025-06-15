import Image from "next/image";
import Button from "../ui/Button/Button";
export default function Services() {
  return (
    <section className="flex flex-col gap-24 mt-48">
      <h2 className=" font-manrope text-[32px] leading-tight">
        Ce qu&apos;on propose chez{" "}
        <span className="font-extrabold">Learni</span>
      </h2>
      <div className="flex gap-16  mb-24">
        <Image
          src="/home/intervenants.svg"
          alt="Services"
          width={675}
          height={635}
        />
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-6">
            <h3 className="font-work-sans text-[24px] font-semibold leading-tight">
              Des intervenants qualifiés et professionels
            </h3>
            <p className="font-manrope text-[16px] leading-6 text-custom-blue-900 opacity-80">
              La qualité de nos <b>formateurs</b> est au cœur de nos
              engagements. Avant toute <b>mission</b>, chaque intervenant fait
              l’objet d’une <b>évaluation</b> rigoureuse de ses{" "}
              <b>compétences pédagogiques et de son expertise métier</b>. Ce
              processus de sélection nous permet de garantir des profils
              fiables, engagés et parfaitement adaptés aux{" "}
              <b>exigences de votre établissement</b>. Nous ne déléguons pas
              simplement des formateurs : nous vous confions des experts
              capables de transmettre efficacement leur savoir, en phase avec
              vos objectifs et vos valeurs.
            </p>
            <div className="flex flex-col gap-6">
              <p className="font-manrope text-[14px] leading-tight text-custom-blue-900 opacity-70">
                Vous avez besoin d&apos;un formateur pour votre école ?
              </p>
              <Button variant="secondary" className="w-fit">
                Contactez-nous
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-16 mb-24">
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-6">
            <h3 className="font-work-sans text-[24px] font-semibold leading-tight">
              Des formations professionnalisantes aux tendances du marché
            </h3>
            <p className="font-manrope text-[16px] leading-6 text-custom-blue-900 opacity-70">
              Chez <b>Learni</b>, chaque formation est pensée sur mesure pour
              répondre aux <b>exigences réelles du marché</b> et s’adapter aux
              besoins spécifiques de votre structure. Grâce à une veille
              continue sur les tendances métiers et les évolutions sectorielles,
              nous concevons des <b>parcours pertinents</b>, opérationnels et
              immédiatement applicables. Qu’il s’agisse de renforcer les
              compétences de vos équipes ou de répondre à de nouveaux enjeux,
              nous mettons <b>l’expertise au service de votre performance</b>.
            </p>
            <Button variant="secondary" className="w-fit">
              Découvrir nos formations
            </Button>
          </div>
        </div>
        <Image
          src="/home/formations.svg"
          alt="Services"
          width={675}
          height={635}
        />
      </div>
    </section>
  );
}
