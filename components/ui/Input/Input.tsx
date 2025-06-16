import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        {...props}
        className={`border-[1px] border-blue-900  border-opacity-20 rounded-[12px] p-4 shadow-[inset_0px_0px_2px_1px_rgba(160,177,211,0.20)] w-full font-archivo text-sm focus:shadow-none focus:border-blue-700 focus:border-opacity-100 focus:outline-none ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
