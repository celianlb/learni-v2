import Button from "@/components/UI/button";

export default function HeroSection() {
  return (
    <section className="relative mt-0 md:mt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/10 via-blue-400/10 to-blue-200/10 blur-3xl -z-10" />
      <div className="flex flex-col relative gap-8 justify-between items-center py-[140px] max-w-[800px] mx-auto">
        <h1 className="font-manrope text-custom-blue-900 font-black text-[32px] md:text-[48px] tracking-[-3px] flex flex-col items-center">
          Des formateurs experts.
          <span> Des formations sur-mesure. </span>
        </h1>
        <p className="font-work-sans text-custom-blue-900 font-normal text-[18px] opacity-70 tracking-[-1px]">
          Une pédagogie active, des intervenants qualifiés, et des formations
          qui font la différence.
        </p>
        <div className="flex gap-4">
          <Button href="/formations">Trouvez une formation</Button>
          <Button href="/contact" variant="secondary">
            Contactez-nous
          </Button>
        </div>
      </div>
    </section>
  );
}
