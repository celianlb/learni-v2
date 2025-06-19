"use client";

import Card from "@/components/UI/Card/Card";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  shapeIndex: number;
}

// Formes SVG disponibles
const shapes = [
  {
    name: "triangle",
    svg: (
      <svg
        width="150"
        height="135"
        viewBox="0 0 201 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M138.22 141.5H11.7803L75 32L138.22 141.5Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M155.22 131.5H28.7803L92 22L155.22 131.5Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M172.22 121.5H45.7803L109 12L172.22 121.5Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M189.22 111.5H62.7803L126 2L189.22 111.5Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: "circle",
    svg: (
      <svg
        width="150"
        height="147"
        viewBox="0 0 164 161"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M59.2798 104.811C56.5517 77.5121 76.4704 53.1706 103.769 50.4424C131.068 47.7141 155.41 67.6321 158.139 94.9309C160.867 122.23 140.948 146.572 113.649 149.3C86.3502 152.029 62.0081 132.11 59.2798 104.811Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M41.5317 90.2885C38.8037 62.9896 58.7224 38.6482 86.0214 35.9199C113.32 33.1917 137.662 53.1097 140.391 80.4085C143.119 107.707 123.2 132.05 95.9013 134.778C68.6022 137.506 44.26 117.587 41.5317 90.2885Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M23.7848 75.765C21.0567 48.4662 40.9754 24.1247 68.2744 21.3965C95.5734 18.6683 119.915 38.5862 122.644 65.885C125.372 93.184 105.453 117.526 78.1543 120.255C50.8552 122.983 26.5131 103.064 23.7848 75.765Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M6.03446 61.2406C3.30639 33.9418 23.2251 9.60032 50.5241 6.87205C77.8231 4.14384 102.165 24.0618 104.894 51.3606C107.622 78.6596 87.7031 103.002 60.404 105.73C33.1049 108.458 8.76272 88.5396 6.03446 61.2406Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: "square",
    svg: (
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-1"
          y="1"
          width="99.3513"
          height="99.3514"
          transform="matrix(-1 0 0 1 148 48.6484)"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <rect
          x="-1"
          y="1"
          width="99.3513"
          height="99.3514"
          transform="matrix(-1 0 0 1 131.784 32.4326)"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <rect
          x="-1"
          y="1"
          width="99.3513"
          height="99.3514"
          transform="matrix(-1 0 0 1 115.568 16.2158)"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <rect
          x="-1"
          y="1"
          width="99.3513"
          height="99.3514"
          transform="matrix(-1 0 0 1 99.3513 0)"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

function StepCard({ number, title, description, shapeIndex }: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  const currentShape = shapes[shapeIndex % shapes.length];

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      transition={{
        duration: 0.1,
        ease: "linear",
      }}
      className="shadow-[0_20px_40px_rgba(42_23_180_/_0.3)] rounded-4xl relative"
    >
      {/* Forme SVG en position absolue */}
      <div className="absolute top-4 right-4 z-10">{currentShape.svg}</div>

      <Card
        className="gap-4 !p-12"
        backgroundType="radial"
        borderType="gradient"
      >
        <span className="text-white text-6xl font-light font-work-sans leading-normal [text-shadow:_0px_0px_20px_rgb(42_23_180_/_1.00)]">
          {number}
        </span>
        <h3 className="font-manrope font-medium text-white text-[20px] opacity-90">
          {title}
        </h3>
        <p className="font-work-sans text-white tracking-[-1px] text-base opacity-70">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}

export default function Step() {
  const steps = [
    {
      number: "1",
      title: "Entretien découverte",
      description:
        "Lors de ce premier entretien nous apprendrons à vous découvrir, vous expliquez les valeurs et les attentes de Learni,",
    },
    {
      number: "2",
      title: "Entretien soft-skills",
      description:
        "Lors de ce premier entretien nous apprendrons à vous découvrir, vous expliquez les valeurs et les attentes de Learni,",
    },
    {
      number: "3",
      title: "Entretien technique",
      description:
        "Lors de ce premier entretien nous apprendrons à vous découvrir, vous expliquez les valeurs et les attentes de Learni,",
    },
  ];

  return (
    <section className="flex gap-16 py-48 min-h-screen">
      <div className="flex flex-col gap-4 sticky top-36 max-w-[50%] h-fit">
        <h2 className="text-custom-blue-900 font-manrope text-[32px] tracking-[-1px] items-center">
          Les étapes pour rejoindre{" "}
          <span className="text-custom-blue-600 font-bold">Learni</span>
        </h2>
        <p className="font-work-sans text-custom-blue-900 font-normal text-[18px] opacity-70 tracking-tight">
          Chez <span className="font-semibold">Learni</span>, la{" "}
          <span className="font-semibold">satisfaction de nos clients</span> est
          une priorité absolue. C&apos;est pourquoi nous apportons une attention
          toute particulière à chaque{" "}
          <span className="font-semibold">
            étape du recrutement de nos formateurs
          </span>
          . Ce processus, volontairement exigeant, nous permet de sélectionner
          des <span className="font-semibold">profils hautement qualifiés</span>
          , capables de s&apos;adapter aux attentes spécifiques de chaque
          établissement ou entreprise. Nous évaluons à la fois les{" "}
          <span className="font-semibold">compétences pédagogiques</span>,
          <span className="font-semibold">l&apos;expertise métier</span> et la
          capacité à{" "}
          <span className="font-semibold">
            transmettre de manière claire et engageante
          </span>
          . Cette rigueur nous permet de garantir un haut niveau de qualité dans
          nos interventions, et de rester à la hauteur de la confiance que nos
          partenaires nous accordent au quotidien.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-[50%]">
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            shapeIndex={index}
          />
        ))}
      </div>
    </section>
  );
}
