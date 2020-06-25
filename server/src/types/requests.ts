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
  prepTime: string,
  cookTime: string,
  servings: number,
  imageFile: string,
  introduction: string,
};