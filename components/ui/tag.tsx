"use client";

import CountUp from "./count-up";

interface TagProps {
  number: number;
  libelle: string;
}

export default function Tag({ number, libelle }: TagProps) {
  return (
    <div className="relative  lg:max-w-[400px] bg-white overflow-clip flex items-center gap-2 p-4 leading-none text-color-custom-blue-900 rounded-[18px]  justify-center border border-blue-200 text-gray-700 shadow-lg shadow-blue-50">
      <p className="text-[24px] font-manrope font-bold z-10">
        <CountUp to={number} duration={0.1} />
      </p>
      <p className="text-base font-manrope font-normal opacity-70 z-10">
        {libelle}
      </p>
    </div>
  );
}
