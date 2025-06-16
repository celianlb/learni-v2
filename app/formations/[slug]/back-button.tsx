"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="group w-fit flex items-center gap-2 cursor-pointer font-work-sans font-medium text-[16px] leading-6 text-custom-blue-900 opacity-80 hover:text-blue-600 transition-colors"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="w-4 h-4 group-hover:text-blue-600 group-hover:-translate-x-[2px] transition-all" />
      Retour
    </button>
  );
}
