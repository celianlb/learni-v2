import { cn } from "@/lib/utils";
import Link from "next/link";
import "./card.css";

type BorderType = "gradient" | "white";
type BackgroundType = "blue" | "radial" | "linear" | "light" | "white";

export default function Card({
  children,
  className,
  borderType = "white",
  backgroundType = "blue",
  link,
}: {
  children: React.ReactNode;
  className?: string;
  borderType?: BorderType;
  backgroundType?: BackgroundType;
  link?: string;
}) {
  const cardContent = (
    <div
      className={cn(
        "card",
        `card-border-${borderType}`,
        backgroundType === "blue" && "bg-custom-blue-700",
        backgroundType === "radial" && "card-bg-radial",
        backgroundType === "linear" && "card-bg-linear",
        backgroundType === "light" && "card-bg-light",
        backgroundType === "white" && "bg-white",
        "p-8 md:p-[60px] shadow-lg flex flex-col gap-10 group",
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
