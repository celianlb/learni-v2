"use client";

import { useEffect, useState } from "react";
import Logo from "../header/Logo";
import MobileMenuModal from "../header/MobileMenuModal";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed z-50 top-0 left-0 right-0 px-4 py-6">
      <header
        className={`transition-all duration-300  rounded-2xl ${
          isScrolled
            ? "bg-white/70 backdrop-blur-md shadow-sm p-3"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            className="flex items-center gap-2 text-customBlue-900 text-base focus:outline-none"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <span className="flex flex-col justify-center items-center mr-2">
              <span className="w-1 h-1 rounded-full bg-custom-blue-900 block mb-1"></span>
              <span className="w-1 h-1 rounded-full bg-custom-blue-900 block mb-1"></span>
              <span className="w-1 h-1 rounded-full bg-custom-blue-900 block"></span>
            </span>
            Menu
          </button>
        </div>
      </header>
      <MobileMenuModal
        open={open}
        onClose={() => setOpen(false)}
        isScrolled={isScrolled}
      />
    </div>
  );
}
