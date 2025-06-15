import { partners } from "@/data/partners";
import PartnersSlider from "./PartnersSlider";

export default async function PartnersSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <PartnersSlider partners={partners} />
    </div>
  );
}
