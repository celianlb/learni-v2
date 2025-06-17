import Button from "@/components/UI/button";
import Image from "next/image";
import { Timeline } from "../timeline/timeline";

export function TimelineSection() {
  const data = [
    {
      title: "2024",
      content: (
        <div className="flex flex-col gap-4">
          <h3 className="font-work-sans tracking-tight text-[24px] font-medium">
            Création de Learni
          </h3>
          <p className="font-work-sans opacity-70 tracking-tight">
            nos premières collaborations
          </p>
          <div className="grid grid-cols-2 gap-4 justify-center">
            <Image
              src="/timeline/efrei-card.svg"
              alt="efrei"
              width={400}
              height={140}
              className="col-span-2 md:col-span-1"
            />
            <Image
              src="/timeline/laplateform-card.svg"
              alt="la plateforme"
              width={400}
              height={140}
              className="col-span-2 md:col-span-1"
            />
            <Image
              src="/timeline/ubisoft-card.svg"
              alt="ubisoft"
              width={400}
              height={140}
              className="col-span-2 md:col-span-1"
            />
            <Image
              src="/timeline/ecoleit-card.svg"
              alt="ecoleit"
              width={400}
              height={140}
              className="col-span-2 md:col-span-1"
            />
          </div>
        </div>
      ),
    },
    {
      title: (
        <p>
          2025 <span className="text-variant">(coming soon)</span>
        </p>
      ),
      content: (
        <div className="flex flex-col gap-4">
          <h3 className="font-work-sans tracking-tight text-[24px] font-medium">
            Création d’un outil interne
          </h3>
          <p className="font-work-sans tracking-tight opacity-70">
            Un outil 100% automatisé pour la création de formations (école) et
            de contenues (formateur)
          </p>
          <Image
            src="/timeline/humia.svg"
            alt="humia by learni"
            width={816}
            height={459}
          />
        </div>
      ),
    },
    {
      title: (
        <p>
          2025 <span className="text-variant">(septembre)</span>
        </p>
      ),
      content: (
        <div className="flex flex-col gap-4">
          <h3 className="font-work-sans tracking-tight text-[24px] font-medium">
            Ouverture de Decentra !
          </h3>
          <p className="font-work-sans tracking-tight opacity-70">
            notre école 100% en ligne, spécialisé dans tous les métiers du web
            et de la blockchain
          </p>
          <Image
            src="/timeline/decentra.svg"
            alt="decentra"
            width={816}
            height={459}
          />
          <div className="relative z-20">
            <Button variant="secondary">Postuler chez Decentra</Button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <Timeline data={data} />
    </>
  );
}
