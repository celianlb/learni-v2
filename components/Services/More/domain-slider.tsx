"use client";

import Card from "@/components/UI/Card/Card";
import { useEffect, useRef, useState } from "react";

import { domains } from "@/data/domain-data";

const firstHalf = domains.slice(0, 7);
const secondHalf = domains.slice(7);

function DomainInfiniteSlider({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<number>(null);
  const [setWidth, setSetWidth] = useState(0);

  // On duplique 3 fois pour la sécurité
  const displayItems = [...items, ...items, ...items];

  useEffect(() => {
    if (!trackRef.current) return;
    // Largeur d'un set d'items
    const cards = trackRef.current.querySelectorAll(".domain-card");
    const width = Array.from(cards)
      .slice(items.length, 2 * items.length)
      .reduce((acc, el) => acc + (el as HTMLElement).offsetWidth, 0);
    setSetWidth(width);

    // Positionne le track au début du 2e set
    (
      trackRef.current as HTMLElement
    ).style.transform = `translateX(${-width}px)`;
  }, [items]);

  useEffect(() => {
    if (!trackRef.current || !setWidth) return;
    let start: number | null = null;

    function animateSlider(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const duration = 20000; // 20s pour un tour complet
      const progress = (elapsed % duration) / duration;
      const distance = direction === "left" ? -setWidth : setWidth;
      let x;
      if (direction === "left") {
        x = -setWidth + progress * distance;
        if (x <= -2 * setWidth) x = -setWidth;
      } else {
        x = -setWidth + progress * distance;
        if (x >= 0) x = -setWidth;
      }
      (trackRef.current as HTMLElement).style.transform = `translateX(${x}px)`;
      reqRef.current = requestAnimationFrame(animateSlider);
    }

    reqRef.current = requestAnimationFrame(animateSlider);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [direction, setWidth]);

  return (
    <div className="w-full overflow-hidden relative">
      <div
        ref={trackRef}
        className="flex py-1 gap-3"
        style={{
          width: "fit-content",
        }}
      >
        {displayItems.map((item, index) => (
          <Card
            key={index}
            backgroundType="blue"
            borderType="gradient"
            className="domain-card flex-shrink-0 p-4 md:p-4 lg:p-4 w-[150px] rounded-sm flex items-center justify-center"
          >
            <span className="text-white font-work-sans font-normal text-[16px] leading-6 tracking-tight">
              {item}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function DomainSlider() {
  return (
    <div className="flex flex-col gap-2 justify-center relative">
      <h3 className="font-work-sans text-white font-semibold mb-16 md:mb-6 px-8 pt-8 md:px-[60px] md:pt-[60px]">
        Nos domaines d&apos;interventions
      </h3>
      <DomainInfiniteSlider items={firstHalf} direction="right" />
      <DomainInfiniteSlider items={secondHalf} direction="left" />
    </div>
  );
}
