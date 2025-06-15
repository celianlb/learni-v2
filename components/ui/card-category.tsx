import { cn } from "@/lib/utils";
import Link from "next/link";
import "../ui/Card/card.css";

export default function CardCategory({
  children,
  className,
  backgroundType,
  link,
}: CategoryCardProps) {
  const cardContent = (
    <div
      className={cn(
        "card",
        "card-border-gradient",
        backgroundType === "radial" && "bg-customBlue-700 hover:bg-[#28324b]",
        backgroundType === "white" && "bg-white hover:bg-[#cacaca]",
        "p-8 shadow-lg flex flex-col gap-10 group transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block w-full h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
