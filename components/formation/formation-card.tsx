import { cn } from "@/lib/utils";
import { FormationWithRelations } from "@/types/formation";
import Image from "next/image";
import Link from "next/link";
import FormationTag from "./formation-tag";

interface FormationCardProps {
  formation: FormationWithRelations;
  className?: string;
  variant?: "default" | "auto";
}

export default function FormationCard({
  formation,
  className,
  variant = "default",
}: FormationCardProps) {
  if (!formation) {
    return null;
  }

  const formatPrice = (price: string) => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""));
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(numericPrice);
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const formatPeople = (people: number) => {
    return `${people} personnes`;
  };

  const cardStyles = {
    default: " h-[400px] ",
    auto: "w-full h-auto",
  };

  return (
    <Link href={`/formations/${formation.slug}`}>
      <div
        className={cn(
          `border-[1px] group border-custom-blue-900/30 bg-gray-100 hover:bg-custom-blue-900 text-white transition-all duration-500 ease-in-out p-6 flex flex-col justify-between rounded-[24px] group relative overflow-hidden cursor-pointer shadow-white`,
          cardStyles[variant],
          className
        )}
      >
        <h3
          className={cn(
            "text-lg font-work-sans group-hover:text-white text-custom-blue-900 tracking-tight font-medium",
            variant === "auto" ? "mb-8" : "mb-4"
          )}
        >
          {formation.titre}
        </h3>
        <div className="flex flex-wrap gap-2 transition-all duration-300 ease-in-out group-hover:-translate-x-[150%]">
          <FormationTag
            icon="/svg/formation-card/person.svg"
            alt="niveau"
            text={formation.niveau}
            className="capitalize"
          />
          <FormationTag
            icon="/svg/formation-card/price.svg"
            alt="prix"
            text={formatPrice(formation.tarifIndividuel)}
          />
          <FormationTag
            icon="/svg/formation-card/duration.svg"
            alt="durée"
            text={formatDuration(formation.duree)}
          />
          <FormationTag
            icon="/svg/formation-card/desktop.svg"
            alt="format"
            text={formation.format}
            className="capitalize"
          />
          <FormationTag
            icon="/svg/formation-card/person.svg"
            alt="participants"
            text={formatPeople(formation.participantsMax)}
          />
        </div>
        <div
          className={cn(
            "absolute right-6 bottom-6 -translate-y-1/2 translate-x-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100",
            variant === "auto" ? " bottom-0" : " bottom-0"
          )}
        >
          <Image src="/svg/arrow.svg" alt="Flèche" width={60} height={60} />
        </div>
      </div>
    </Link>
  );
}
