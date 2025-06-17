"use client";

import Button from "@/components/UI/button";
import { globeConfig, sampleArcs } from "@/data/globe-data";
import dynamic from "next/dynamic";

const World = dynamic(() => import("./globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo({
  title,
  description,
  buttonText,
}: {
  title: string;
  description: string;
  buttonText: string;
}) {
  return (
    <div className="flex flex-row items-center justify-center relative w-full">
      <div className="  relative overflow-hidden h-[30rem] md:h-[40rem] px-4">
        <div className="flex flex-col gap-8 items-center">
          <h2 className="text-[32px] font-manrope tracking-[-1px] font-semibold">
            {title}
          </h2>
          <p className="font-manrope text-[16px] leading-6 text-custom-blue-900 opacity-80">
            {description}
          </p>
          <Button variant="secondary" href="/contact">
            {buttonText}
          </Button>
        </div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent  to-white z-40" />
        <div className="absolute w-full left-0 -bottom-20 md:-bottom-40 h-72 md:h-full -z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
