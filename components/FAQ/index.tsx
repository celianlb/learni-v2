"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex items-center gap-16 justify-between mt-48">
      <Image
        width={270}
        height={298}
        src="/assets/faq-robot.svg"
        alt="faq"
        className="hidden md:block"
      />
      <div className="w-full mx-auto space-y-4">
        <h2 className="text-[32px] font-semibold mb-8">
          On répond à vos questions
        </h2>
        {items.map((item, index) => (
          <div key={index} className="w-full">
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full flex items-center justify-between cursor-pointer p-4 rounded-lg transition-colors ${
                openIndex === index
                  ? "bg-blue-100/80 hover:bg-blue-100"
                  : "bg-blue-50/50 hover:bg-blue-50"
              }`}
            >
              <span
                className={`text-left font-medium ${
                  openIndex === index ? "text-blue-900" : ""
                }`}
              >
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={openIndex === index ? "text-blue-900" : ""}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 mt-2 bg-white rounded-lg">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
