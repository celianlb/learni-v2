import { Category, Formation, Programme, Tag } from "@prisma/client";

export type FormationWithRelations = Formation & {
  programme: Programme[];
  category: Category | null;
  tags: Tag[];
};

type ProgrammeDay = {
  day: number;
  title: string;
  content: string[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FormationCardProps = {
  title: string;
  public: string;
  publicDescription: string;
  price: number;
  duration: number;
  type: "Présentiel" | "Distanciel";
  people: number;
  className?: string;
  slug: string;
  tags: string[];
  description: string;
  objectives: string[];
  programme: ProgrammeDay[];
  evaluationMethods: string[];
  learningMethods: string[];
};
