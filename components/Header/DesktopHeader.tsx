"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button/Button";
import Logo from "./Logo";
import Nav from "./Nav";

export default function DesktopHeader() {
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
    <div className="fixed z-50 top-0 left-0 right-0 rounded-4xl py-4 px-10 md:px-24 2xl:px-[15%]">
      <header
        className={`transition-all  duration-300 border-[1px] border-blue-900/0 rounded-3xl ${
          isScrolled
            ? "bg-white/70 mt-3 p-4 backdrop-blur-md shadow-sm border-[1px] border-blue-900/30"
            : "bg-transparent"
        }`}
      >
        <div className="  flex  justify-between items-center">
          <div className="w-1/4">
            <Logo />
          </div>

          <div className="w-2/4 flex justify-center">
            <Nav />
          </div>

          <div className="w-1/4 flex justify-end relative z-20">
            <Button variant="primary">Prendre un RDV</Button>
          </div>
        </div>
      </header>
    </div>
  );
}
