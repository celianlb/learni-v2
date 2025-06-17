import CardSection from "@/components/section/card-section";
import { GlobeDemo } from "./Globe";

export default function Intervention() {
  return (
    <CardSection className="flex flex-col justify-start items-start h-[500px] overflow-y-hidden mt-16">
      <GlobeDemo
        title="Nous intervenons partout !"
        description="Car le monde entier mérite d’avoir les meilleurs formateurs à disposition"
        buttonText="Contactez-nous dès maintenant"
      />
    </CardSection>
  );
}
