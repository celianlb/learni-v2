"use client";
import Button from "@/components/UI/button";

export default function ContactFormFormateur() {
  return (
    <section className="flex flex-col gap-8 p-16 bg-custom-blue-800 rounded-4xl justify-center items-center">
      <h2 className="text-white font-bold font-manrope text-[40px] tracking-[-2px] text-center max-w-[530px] [text-shadow:_0px_0px_15px_rgb(255_255_255_/_0.40)]">
        Candidatez pour rejoindre notre équipe de formateur !
      </h2>
      <form className="flex flex-col gap-4 max-w-[600px]">
        <div className="flex gap-4">
          <input
            className="bg-white/90 font-work-sans text-[16px] font-normal tracking-[-1px] backdrop-blur-sm border border-gray-200 focus:border-custom-blue-500 focus:ring-2 focus:ring-custom-blue-500/20 focus:bg-white  hover:border-gray-300  transition-all duration-200 ease-in-out w-full py-3 px-4 rounded-lg outline-none placeholder:text-gray-500 text-gray-900 shadow-sm"
            type="text"
            placeholder="Nom"
          />
          <input
            className="bg-white/90 font-work-sans text-[16px] font-normal tracking-[-1px] backdrop-blur-sm border border-gray-200 focus:border-custom-blue-500 focus:ring-2 focus:ring-custom-blue-500/20 focus:bg-white  hover:border-gray-300 transition-all duration-200 ease-in-out w-full py-3 px-4 rounded-lg outline-none placeholder:text-gray-500 text-gray-900 shadow-sm"
            type="text"
            placeholder="Prénom"
          />
        </div>
        <div className="flex gap-4">
          <input
            className="bg-white/90 font-work-sans text-[16px] font-normal tracking-[-1px] backdrop-blur-sm border border-gray-200 focus:border-custom-blue-500 focus:ring-2 focus:ring-custom-blue-500/20 focus:bg-white  hover:border-gray-300  transition-all duration-200 ease-in-out w-full py-3 px-4 rounded-lg outline-none placeholder:text-gray-500 text-gray-900 shadow-sm"
            type="email"
            placeholder="Email"
          />
          <input
            className="bg-white/90 font-work-sans text-[16px] font-normal tracking-[-1px] backdrop-blur-sm border border-gray-200 focus:border-custom-blue-500 focus:ring-2 focus:ring-custom-blue-500/20 focus:bg-white  hover:border-gray-300  transition-all duration-200 ease-in-out w-full py-3 px-4 rounded-lg outline-none placeholder:text-gray-500 text-gray-900 shadow-sm"
            type="tel"
            placeholder="Téléphone"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="cv-upload"
            className="text-white font-work-sans text-[14px] font-medium"
          >
            CV (PDF)
          </label>
          <div className="relative">
            <input
              id="cv-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              accept=".pdf"
              required
            />
            <div className="bg-white/90 font-work-sans text-[16px] font-normal tracking-[-1px] backdrop-blur-sm border border-gray-200 hover:border-gray-300 transition-all duration-200 ease-in-out w-full py-3 px-4 rounded-lg text-gray-900 shadow-sm flex items-center justify-between">
              <span className="text-gray-500">Sélectionner un fichier PDF</span>
              <button
                type="button"
                className="bg-white hover:bg-gray-100 font-work-sans text-[16px] font-normal tracking-[-1px] border border-gray-400 text-custom-blue-900 py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => document.getElementById("cv-upload")?.click()}
              >
                Parcourir
              </button>
            </div>
          </div>
        </div>
        <textarea
          className="bg-white/90 font-work-sans text-[16px] font-normal tracking-[-1px] backdrop-blur-sm border border-gray-200 focus:border-custom-blue-500 focus:ring-2 focus:ring-custom-blue-500/20 focus:bg-white  hover:border-gray-300  transition-all duration-200 ease-in-out w-full py-3 px-4 rounded-lg outline-none placeholder:text-gray-500 text-gray-900 shadow-sm resize-none min-h-[120px]"
          placeholder="Message"
        />
        <div className="relative z-20 ml-auto">
          <Button variant="secondary" type="submit">
            Envoyer
          </Button>
        </div>
      </form>
    </section>
  );
}
