import TestimonialCard, { Testimonial } from "./testimonial-card";
const testimonials: Testimonial[] = [
  {
    school: "Ingetis",
    logoUrl: "/partners/white/ingetis.svg",
    quote:
      "“Nous avons confié à Learni la création complète de notre nouveau programme de second cycle. Sous la direction d'Allan et Fouzi, ils sélectionnent désormais nos formateurs, garantissant des contenus pertinents et un fort engagement. Résultat : des apprenants très satisfaits et une offre éducative nettement renforcée.”",
    name: "Thibaut AIME",
    job: "Directeur Général",
  },
  {
    school: "Ecole IT",
    logoUrl: "/partners/white/ecoleit.svg",
    quote:
      "“En tant Responsable pédagogique, j'ai été conquis par la réactivité et le professionnalisme de Learni : sélection rigoureuse des formateurs, remontée rapide des notes, disponibilité constante et soutien aux jurys comme à la professionnalisation des apprenants. Je les recommande vivement !”",
    name: "Arnaud PARADIS",
    job: "Responsable pedagogique",
  },
  {
    school: "AFCI",
    logoUrl: "/partners/white/afci.svg",
    quote:
      "“Grâce à Allan et Célian nous sommes passer d'un taux de réussite de 60% à 100% sur nos sessions d'examens pour la formation 'Concepteur & Développeur d'Application' ainsi que la formation 'Développeur Web & Web Mobile'",
    name: "Julien BIANCO",
    job: "Directeur Général",
  },
  {
    school: "My Digital School",
    logoUrl: "/partners/white/mydigitalschool.svg",
    quote:
      "“Depuis l'arrivée des équipes Learni au sein de notre établissement, nous avons établit un superbe travail qui n'est que le début d'une longue collaboration.”",
    name: "Marie THRIBORD",
    job: "Directrice pédagogique",
  },
];

export default function Testimonials() {
  // Pour desktop (3 colonnes)
  const columnsDesktop = [
    [testimonials[0]], // Ingetis
    [testimonials[1], testimonials[3]], // Ecole IT + My Digital School
    [testimonials[2]], // AFCI
  ];

  // Pour tablette (2 colonnes équilibrées)
  const columnsTablet = [
    [testimonials[0], testimonials[2]], // Ingetis + AFCI
    [testimonials[1], testimonials[3]], // Ecole IT + My Digital School
  ];

  return (
    <section className="flex flex-col mt-24 md:mt-48">
      <h2 className=" font-manrope tracking-[-1px] text-[28px] md:text-[32px] leading-tight">
        Ce qu&apos;ils disent de <span className="font-extrabold">Learni</span>
      </h2>
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-8 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-blue-400/10 to-blue-200/20 blur-3xl -z-10" />
        {columnsDesktop.map((col, colIdx) => (
          <div
            key={colIdx}
            className={
              `${col.length === 2 ? "flex flex-col gap-8" : ""} ` +
              (colIdx === 0 ? "lg:mt-16" : "") +
              (colIdx === 2 ? " lg:mt-[220px]" : "")
            }
          >
            {col.map((testimonial) => (
              <TestimonialCard
                key={testimonial.school}
                testimonial={testimonial}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Tablette */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 w-full">
        {columnsTablet.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-8">
            {col.map((testimonial) => (
              <TestimonialCard
                key={testimonial.school}
                testimonial={testimonial}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Mobile */}
      <div className="grid md:hidden grid-cols-1 gap-8 w-full">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.school} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
