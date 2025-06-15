import Tag from "./tag";

const tags = [
  { number: "4", libelle: "ans sur le terrain" },
  { number: "99", libelle: "% de satisfaction" },
  { number: "5000", libelle: "apprenants formés" },
  { number: "800", libelle: "formations proposées" },
];

export default async function TagSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mx-auto">
        {tags.map((tag, index) => (
          <div key={index} className="w-full">
            <Tag number={parseInt(tag.number)} libelle={tag.libelle} />
          </div>
        ))}
      </div>
    </div>
  );
}
