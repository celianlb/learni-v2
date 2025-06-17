export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Tag = {
  id: number;
  name: string;
  categoryId: number;
};
