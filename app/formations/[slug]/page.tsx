import ContactFormFormation from "./contact-form-formation";
import HeroSectionFormation from "./hero-section";
import ProgrammeFormationSection from "./programme-formation-section";
import SuggestedFormation from "./suggested-formation";

export default async function FormationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main>
      <HeroSectionFormation params={params} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        <div className="order-1 pt-14 lg:pt-32">
          <ProgrammeFormationSection params={Promise.resolve(params)} />
        </div>
        <div className="order-2 lg:sticky lg:top-4 lg:self-start  lg:pt-32">
          <ContactFormFormation />
        </div>
      </div>
      <SuggestedFormation currentSlug={(await params).slug} />
    </main>
  );
}
