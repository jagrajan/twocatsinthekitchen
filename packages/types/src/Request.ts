export namespace Request {
  export type CreateRecipe = {
    recipe_id?: number;
    steps: string[];
    notes: string[];
    tags: number[];
    ingredients: {
      unit: number;
      ingredient: number;
      minAmount: string;
      maxAmount: string;
      instructions?: string;
      alternativeMeasurement: {
        unit: number;
        minAmount: string;
        maxAmount: string;
      }[];
    }[];
    slug: string;
    name: string;
    description: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    imageFile: string;
    introduction: string;
  };
}
