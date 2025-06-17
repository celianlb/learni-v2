import { cn } from "@/lib/utils";
import { FormationWithRelations } from "@/types/formation";
import Image from "next/image";
import Link from "next/link";
import "../../../components/ui/Card/card.css";
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
          `border-[0.5px] group   bg-custom-blue-800 hover:bg-custom-blue-600 text-white transition-all duration-500 ease-in-out p-6 flex flex-col justify-between rounded-[24px] group relative overflow-hidden cursor-pointer shadow-white before:absolute before:inset-0 before:opacity-[0.1] before:bg-[url('/assets/noise-texture.jpeg')] before:bg-cover before:mix-blend-overlay shadow-[inset_0px_0px_4px_0px_rgba(10,2,65,0.5)]`,
          cardStyles[variant],
          className
        )}
      >
        <h3
          className={cn(
            "text-lg font-work-sans tracking-tight font-medium",
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
