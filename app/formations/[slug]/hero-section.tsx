import Card from "@/components/ui/Card/Card";
import { getOneFormation } from "@/queries/getFormation";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "./back-button";
import SocialSharing from "./social-sharing";

export default async function HeroSectionFormation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formation = await getOneFormation(slug);

  if (!formation) {
    notFound();
  }

  return (
    <section className="bg-white rounded-b-3xl pt-40 lg:rounded-b-[42px] relative overflow-hidden gap-12 flex flex-col justify-between">
      <Image
        src="/assets/neon.png"
        alt="public"
        className="absolute  bottom-5 right-5 object-cover opacity-20"
        width={700}
        height={700}
      />
      <Image
        src="/assets/neon.png"
        alt="public"
        className="absolute  top-0 left-0 object-cover opacity-10"
        width={700}
        height={700}
      />
      <div className="flex flex-col gap-8 md:gap-24">
        <div className="flex flex-col gap-4">
          <BackButton />
          <h1 className="font-manrope text-custom-blue-900 font-black text-[32px] md:text-[48px] tracking-tight">
            {formation.titre}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-8 items-start md:items-center">
          <div className="flex flex-col md:flex-row lg:flex-col gap-8">
            <div className="flex items-center gap-2 font-work-sans text-[16px] leading-6 text-custom-blue-900 opacity-80">
              <Image
                src="/svg/person.svg"
                alt="public"
                width={32}
                height={32}
              />
              {formation.participantsMax} personnes max.
            </div>
            <div className="flex items-center gap-2 font-work-sans text-[16px] leading-6 text-custom-blue-900 opacity-80">
              <Image src="/svg/price.svg" alt="price" width={32} height={32} />à
              partir de {formation.tarifIndividuel}
            </div>
            <div className="flex items-center gap-2 font-work-sans text-[16px] leading-6 text-custom-blue-900 opacity-80">
              <Image
                src="/svg/duration.svg"
                alt="duration"
                width={32}
                height={32}
              />
              {formation.duree}
            </div>
            <div className="flex items-center gap-2 font-work-sans text-[16px] leading-6 text-custom-blue-900 opacity-80 capitalize">
              <Image
                src={"/svg/desktop.svg"}
                width={32}
                height={32}
                alt="type"
              />
              {formation.format}
            </div>
          </div>
          <div className="flex relative flex-col md:flex-row gap-4 h-fit w-full md:justify-center lg:justify-end">
            <Card
              backgroundType="blue"
              borderType="white"
              className="p-8 gap-4 md:p-8 md:min-w-[300px] md:max-w-[400px]"
            >
              <p className="text-white font-semibold font-work-sans text-[18px]">
                Public
              </p>
              <p className="text-white font-work-sans text-[16px] leading-6 opacity-80">
                {formation.public}
              </p>
            </Card>
            <Card
              backgroundType="blue"
              borderType="white"
              className="p-8 gap-4 md:p-8 md:min-w-[300px] md:max-w-[400px]"
            >
              <p className="text-white font-semibold font-work-sans text-[18px]">
                Prérequis
              </p>
              <p className="text-white font-work-sans text-[16px] leading-6 opacity-80">
                {formation.prerequis}
              </p>
            </Card>
          </div>
        </div>
      </div>

      <SocialSharing
        title={formation.titre}
        description={formation.prerequis}
      />
    </section>
  );
}
