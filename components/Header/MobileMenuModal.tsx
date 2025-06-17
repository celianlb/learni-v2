"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "../header/Nav";
import Button from "../UI/button";
import "./MobileMenuModal.css";

interface MobileMenuModalProps {
  open: boolean;
  onClose: () => void;
  isScrolled: boolean;
}

export default function MobileMenuModal({
  open,
  onClose,
  isScrolled,
}: MobileMenuModalProps) {
  const [show, setShow] = useState(open);
  const [animClass, setAnimClass] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setShow(true);
      setAnimClass("mobile-menu-anim-enter");
      window.addEventListener("scroll", onClose, { once: true });
    } else if (show) {
      setAnimClass("mobile-menu-anim-leave");
      timeoutRef.current = setTimeout(() => {
        setShow(false);
      }, 250); // durée de l'animation slideUp
      window.removeEventListener("scroll", onClose);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("scroll", onClose);
    };
  }, [open]);

  if (!show) return null;
  return (
    <>
      {/* Overlay semi-transparent */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Menu sous la navbar */}
      <div
        className={`fixed left-0 right-0 top-[110px] z-50 rounded-2xl shadow-lg mx-5 flex flex-col items-start p-10 ${animClass} ${
          isScrolled ? "bg-white/70 backdrop-blur-md " : "bg-white"
        }`}
      >
        <div className="mb-8 w-full flex flex-col items-start">
          <Nav variant="mobile" />
        </div>
        <Button variant="secondary">Prendre un RDV</Button>
      </div>
    </>
  );
}
