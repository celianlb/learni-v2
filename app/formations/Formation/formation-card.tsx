import { cn } from "@/lib/utils";
import { FormationWithRelations } from "@/types/formation";
import Image from "next/image";
import Link from "next/link";
import "../../../components/ui/Card/card.css";

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
          `border-[0.5px] group hover:border-custom-blue-900  bg-custom-blue-800 hover:bg-blue-900 text-white transition-all duration-500 ease-in-out p-6 flex flex-col justify-between rounded-[24px] group relative overflow-hidden cursor-pointer shadow-white before:absolute before:inset-0 before:opacity-[0.3] before:bg-[url('/assets/noise-texture.jpeg')] before:bg-cover before:mix-blend-overlay shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.2)]`,
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
          <span className="font-archivo capitalize text-[14px] rounded-lg px-3 py-1 text-white bg-custom-blue-700 border flex items-center gap-2">
            <Image
              src="/svg/formation-card/person.svg"
              alt="niveau"
              width={16}
              height={16}
            />
            {formation.niveau}
          </span>
          <span className="font-archivo text-[14px] rounded-lg px-3 py-1 text-white bg-custom-blue-700 border  flex items-center gap-2">
            <Image
              src="/svg/formation-card/price.svg"
              alt="prix"
              width={16}
              height={16}
            />
            {formatPrice(formation.tarifIndividuel)}
          </span>
          <span className="font-archivo text-[14px] rounded-lg px-3 py-1 text-white bg-custom-blue-700 border flex items-center gap-2">
            <Image
              src="/svg/formation-card/duration.svg"
              alt="durée"
              width={16}
              height={16}
            />
            {formatDuration(formation.duree)}
          </span>
          <span className="font-archivo capitalize text-[14px] rounded-lg px-3 py-1 text-white bg-custom-blue-700 border flex items-center gap-2">
            <Image
              src="/svg/formation-card/desktop.svg"
              alt="format"
              width={16}
              height={16}
            />
            {formation.format}
          </span>
          <span className="font-archivo text-[14px] rounded-lg px-3 py-1 text-white bg-custom-blue-700 border flex items-center gap-2 ">
            <Image
              src="/svg/formation-card/person.svg"
              alt="participants"
              width={16}
              height={16}
            />
            {formatPeople(formation.participantsMax)}
          </span>
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
