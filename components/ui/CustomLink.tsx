"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CustomLink({
  href,
  children,
  icon: Icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group  hover:text-blue-700  flex items-center gap-2 font-work-sans tracking-tight text-[16px] font-normal transition-colors duration-200 ${
        isActive ? "text-custom-blue-600" : "text-custom-blue-900"
      }`}
    >
      {Icon && (
        <Icon
          className={`size-4 transition-transform duration-200 group-hover:text-blue-300 ${
            isActive
              ? "text-color-custom-blue-300"
              : "text-color-custom-blue-900"
          }`}
        />
      )}
      {children}
    </Link>
  );
}
