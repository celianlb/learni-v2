"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenuModal from "./MobileMenuModal";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-6 bg-white">
      <Link
        href="/"
        className="text-2xl tracking-widest font-archia text-customBlue-900"
      >
        LEAR<span className="font-normal">NI</span>
      </Link>
      <button
        className="flex items-center gap-2 text-customBlue-900 text-base focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <span className="flex flex-col justify-center items-center mr-2">
          <span className="w-1 h-1 rounded-full bg-customBlue-900 block mb-1"></span>
          <span className="w-1 h-1 rounded-full bg-customBlue-900 block mb-1"></span>
          <span className="w-1 h-1 rounded-full bg-customBlue-900 block"></span>
        </span>
        Menu
      </button>
      <MobileMenuModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
