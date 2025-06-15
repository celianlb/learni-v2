type CategoryProps = {
  categories: {
    id: number;
    title: string;
    slug: string;
  }[];
};

type CategoryCardProps = {
  children: React.ReactNode;
  className?: string;
  backgroundType: "radial" | "white";
  link?: string;
};
