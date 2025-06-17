import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({
  article,
  className,
  variant = "default",
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  if (!article) {
    return null;
  }

  return (
    <Link href={`/blog/${article.slug}`}>
      <div
        className={cn(
          `border-[0.5px] h-[40vh] group hover:border-customBlue-900  bg-customBlue-800 hover:bg-customBlue-700 text-white transition-all duration-500 ease-in-out p-6 flex flex-col justify-between rounded-[24px] group relative overflow-hidden cursor-pointer shadow-white before:absolute before:inset-0 before:opacity-[0.3] before:bg-[url('/assets/noise-texture.jpeg')] before:bg-cover before:mix-blend-overlay shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.2)]`,
          className
        )}
      >
        <h3
          className={cn(
            "text-lg font-semibold",
            variant === "auto" ? "mb-8" : "mb-4"
          )}
        >
          {article.titre}
        </h3>
        <p>{article.description}</p>
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
