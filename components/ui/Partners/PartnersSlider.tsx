"use client";

import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Partner {
  name: string;
  image: string;
}

interface PartnersProps {
  partners: Partner[];
  className?: string;
}

export default function PartnersSlider({ partners, className }: PartnersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!trackRef.current) return;

    const trackWidth = trackRef.current.scrollWidth;
    const distance = trackWidth / 2;

    const controls = animate(x, -distance, {
      duration: 20,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      ease: "linear",
    });

    return () => controls.stop();
  }, []);

  return (
    <div
      className={cn("w-full overflow-hidden relative", className)}
      ref={containerRef}
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      <motion.div
        ref={trackRef}
        className="flex gap-6"
        style={{
          width: "fit-content",
          x,
        }}
      >
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[200px] h-[40px] relative"
          >
            <Image
              src={partner.image}
              alt={partner.name}
              fill
              className="object-contain opacity-60"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
