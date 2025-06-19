import Button from "@/components/UI/button";
import Card from "@/components/UI/Card/Card";
import Image from "next/image";

export default function MoreServices() {
  return (
    <section className="p-4 md:p-8 lg:p-16 bg-custom-blue-800 rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-[220px]">
        <div className="md:col-span-2 items-start lg:col-span-1 bg-white rounded-3xl flex flex-col gap-6 p-6 md:p-8 shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]">
          <Image
            src="/services/desktop.svg"
            alt="Création de module e-learning"
            width={50}
            height={51}
            className="h-10 w-auto"
          />
          <h3 className="text-custom-blue-900/80 font-manrope font-medium text-base md:text-lg lg:text-xl tracking-[-1px]">
            Création de module e-learning
          </h3>
        </div>

        <Card
          backgroundType="radial"
          borderType="white"
          className="md:col-span-2 items-start lg:col-span-1 flex flex-col gap-6 p-6 md:p-8 h-full shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]"
        >
          <Image
            src="/services/planning.svg"
            alt="Gestion de la planification"
            width={50}
            height={51}
            className="h-10 w-auto"
          />
          <h3 className="text-white opacity-80 font-manrope font-medium text-base md:text-lg lg:text-xl tracking-[-1px]">
            Gestion de la planification
          </h3>
        </Card>

        <div className="col-span-1 items-start md:col-span-2 lg:col-span-2 bg-white rounded-3xl flex flex-col gap-6 p-6 md:p-8 h-full shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]">
          <Image
            src="/services/cube.svg"
            alt="Programme sur mesure"
            width={50}
            height={51}
            className="h-10 w-auto"
          />
          <h3 className="text-custom-blue-900/80 font-manrope font-medium text-base md:text-lg lg:text-xl tracking-[-1px]">
            On crée votre programme sur mesure
          </h3>
        </div>

        <Card
          backgroundType="radial"
          borderType="white"
          className="md:col-span-2 items-start lg:col-span-2 flex flex-col gap-6 p-6 md:p-8 h-full shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]"
        >
          <Image
            src="/services/person.svg"
            alt="Expert correspondant"
            width={50}
            height={51}
            className="h-10 w-auto"
          />
          <h3 className="text-white opacity-80 font-manrope font-medium text-base md:text-lg lg:text-xl tracking-[-1px]">
            On trouve l&apos;expert qui vous corresponds
          </h3>
        </Card>

        <div className="md:col-span-2 items-start lg:col-span-1 bg-white rounded-3xl flex flex-col gap-6 p-6 md:p-8 h-full shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]">
          <Image
            src="/services/page.svg"
            alt="Création des syllabuses"
            width={50}
            height={51}
            className="h-10 w-auto"
          />
          <h3 className="text-custom-blue-900/80 font-manrope font-medium text-base md:text-lg lg:text-xl tracking-[-1px]">
            Création des syllabuses
          </h3>
        </div>

        <Card
          backgroundType="radial"
          borderType="white"
          className="md:col-span-2 items-start lg:col-span-1 flex flex-col gap-6 p-6 md:p-8 h-full shadow-[0_0_10px_1px_rgba(255,255,255,0.2)]"
        >
          <Image
            src="/services/cycle.svg"
            alt="Automatisation de l'organisme"
            width={50}
            height={51}
            className="h-10 w-auto"
          />
          <h3 className="text-white opacity-80 font-manrope font-medium text-base md:text-lg lg:text-xl tracking-[-1px]">
            Automatisation de votre organisme
          </h3>
        </Card>
      </div>
      <div className="relative z-20 w-fit ml-auto">
        <Button variant="secondary" className="w-full mt-8">
          Contactez-nous
        </Button>
      </div>
    </section>
  );
}
