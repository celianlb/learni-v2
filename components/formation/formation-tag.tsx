import { cn } from "@/lib/utils";
import Image from "next/image";

interface FormationTagProps {
  icon: string;
  alt: string;
  text: string;
  className?: string;
}

export default function FormationTag({
  icon,
  alt,
  text,
  className,
}: FormationTagProps) {
  return (
    <span
      className={cn(
        "font-archivo text-[14px] rounded-lg px-3 py-1 text-white bg-custom-blue-700 border border-white/40 flex items-center gap-2",
        className
      )}
    >
      <Image src={icon} alt={alt} width={16} height={16} />
      {text}
    </span>
  );
}
