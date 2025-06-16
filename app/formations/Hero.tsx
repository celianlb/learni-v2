import Button from "@/components/ui/Button/Button";
import { FlipWords } from "@/components/ui/flip-words";
import PartnersSlider from "@/components/ui/Partners/PartnersSlider";
import { domains } from "@/data/domain-data";
import { partners } from "@/data/partners";
import SearchBar from "./searchbar";
export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] justify-center items-center bg-white rounded-b-3xl lg:rounded-b-[42px] relative overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <h1 className="flex flex-col items-center font-manrope text-[48px] font-bold justify-center text-center">
          Trouver votre formation
          <br />
          <FlipWords
            words={domains}
            duration={1000}
            className="text-custom-blue-600"
          />
        </h1>
        <div className="flex gap-6 flex-col md:flex-row items-center">
          <SearchBar />
          <div className="relative z-20">
            <Button variant="secondary">Découvrir les formations</Button>
          </div>
        </div>
      </div>

      <PartnersSlider partners={partners} className="w-full" />
    </section>
  );
}
