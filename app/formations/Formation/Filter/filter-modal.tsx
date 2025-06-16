import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import FilterFormation from "./filter-formation";

export default function FilterModal() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        className={` top-0 z-20 bg-white text-body font-normal text-customBlue-900 p-4 transition-all duration-300 flex w-full gap-2 justify-center border-[1.5px] rounded-xl border-[#65EDFF] `}
        onClick={() => setOpen(true)}
      >
        <Image src="/svg/filter.svg" alt="filter" width={24} height={24} />
        <span>Filtre</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-customBlue-800 bg-opacity-50 flex justify-center items-center py-16 px-4 overflow-y-auto"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full p-16 max-w-full
                          sm:w-2/3 lg:w-1/2 bg-white rounded-2xl relative"
            >
              <button
                className="absolute top-6 right-6 text-3xl text-indigo-900 font-bold"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
              >
                ×
              </button>
              <FilterFormation onValidate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
