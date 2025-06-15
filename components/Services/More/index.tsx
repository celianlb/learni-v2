import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Image from "next/image";
import DomainSlider from "./DomainSlider";
export default function More() {
  return (
    <section>
      <h2 className=" text-h2  text-white">Mais aussi...</h2>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-x-6 gap-y-6">
        {/* Ligne 1 */}
        <div className="md:col-span-4">
          <Card backgroundType="blue" className="h-[300px] justify-end">
            <h3 className="font-work-sans text-white font-semibold">
              Création de modules e-learning
            </h3>
            <div className="relative z-20">
              <Button variant="secondary" className="w-full">
                Contactez-nous
              </Button>
            </div>
          </Card>
        </div>
        <div className="md:col-span-6">
          <Card
            className="relative h-[300px] justify-end"
            backgroundType="radial"
            borderType="gradient"
          >
            <Image
              className="absolute top-0 left-1/2 -translate-x-1/2"
              width={400}
              height={400}
              src="/assets/circle.png"
              alt="image"
            />
            <h3 className="font-work-sans text-white font-semibold mt-14">
              On crée votre programme sur mesure
            </h3>
            <div className="relative z-20">
              <Button variant="secondary" className="w-full">
                Prendre un RDV
              </Button>
            </div>
          </Card>
        </div>
        {/* Ligne 2 */}
        <div className="md:col-span-6">
          <Card
            backgroundType="radial"
            borderType="gradient"
            className="relative h-[300px] p-0 md:p-0"
          >
            <DomainSlider />
          </Card>
        </div>
        <div className="md:col-span-4">
          <Card
            backgroundType="blue"
            borderType="white"
            className="h-[300px] justify-end"
          >
            <Image
              src="/svg/dot-circle.svg"
              alt="Domain slider"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="flex flex-col gap-4">
              <h3 className="text-[16px] font-work-sans text-white font-semibold">
                Automatisation de votre organisme
              </h3>
              <h3 className="text-[16px] font-work-sans text-white font-semibold">
                Gestion de la planification
              </h3>
              <h3 className="text-[16px] font-work-sans text-white font-semibold">
                Création des syllabus
              </h3>
            </div>

            <div className="relative z-20">
              <Button variant="secondary" className="w-full">
                Contactez-nous
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
