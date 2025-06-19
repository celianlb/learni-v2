import PartnersSection from "@/components/UI/Partners/PartnersSection";
import ContactFormFormateur from "./contact-form-formateur";
import HeroSection from "./hero";
import Step from "./step";
export default function page() {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <Step />
      <ContactFormFormateur />
    </main>
  );
}
