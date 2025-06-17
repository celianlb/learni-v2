import { FlipWords } from "@/components/UI/flip-words";
import PartnersSlider from "@/components/UI/Partners/PartnersSlider";
import { partners } from "@/data/partners";
import SearchBar from "../../../../components/formation/searchbar";

interface HeroCategoryProps {
  category: {
    name: string;
    id: number;
    slug: string;
  };
}

export default function HeroCategory({ category }: HeroCategoryProps) {
  return (
    <section className="min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] justify-center items-center bg-white rounded-b-3xl lg:rounded-b-[42px] relative overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <h1 className="flex flex-col items-center text-customBlue-900 justify-center text-center">
          Trouver votre formation
          <br />
          <FlipWords
            words={[category.name]}
            duration={1000}
            className="text-customBlue-600"
          />
        </h1>
        <div className="flex gap-6 flex-col md:flex-row items-center">
          <SearchBar />
        </div>
      </div>

      <PartnersSlider partners={partners} className="w-full" />
    </section>
  );
}
