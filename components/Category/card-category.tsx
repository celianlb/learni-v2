import { cn } from "@/lib/utils";
import Link from "next/link";
import "../UI/Card/card.css";

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
        backgroundType === "radial" && "bg-custom-blue-700 hover:bg-blue-900",
        backgroundType === "white" && "bg-white hover:bg-blue-50",
        "p-8 shadow-lg flex flex-col gap-10 group transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );

  if (link) {
    return (
      <Link
        href={link}
        className="block font-work-sans tracking-tight font-medium w-full h-full"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
