import CategoryCard from "./card-category";

export default function AllCategory({ categories }: CategoryProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
      {categories.slice(0, 6).map((category, index) => (
        <CategoryCard
          key={category.id}
          link={`/formations/category/${category.slug}`}
          backgroundType={index % 2 === 0 ? "radial" : "white"}
          className={`items-center ${
            index % 2 === 0 ? "text-white" : "text-customBlue-900"
          }`}
        >
          <h3 className="text-base">{category.title}</h3>
        </CategoryCard>
      ))}
    </div>
  );
}
