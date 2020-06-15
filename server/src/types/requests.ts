export type CreateRecipeBody = {
  recipe_id?: number,
  steps: string[],
  notes: string[],
  ingredients: {
    unit: number,
    ingredient: number,
    minAmount: string;
    maxAmount: string,
  }[],
  slug: string,
  name: string,
  description: string,
  imageFile: string,
};
