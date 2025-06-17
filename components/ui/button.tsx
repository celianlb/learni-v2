import { cn } from "@/lib/utils";
import Link from "next/link";
import "./style.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  href,
  type = "button",
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "button cursor-pointer",
        variant === "secondary" && "button-secondary",
        className
      )}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </button>
  );
}
