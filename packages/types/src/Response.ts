import { ingredient, unit, recipe_version } from '@prisma/client';

export namespace Response {
  export type RecipeDetails = recipe_version & {
    recipe_step: { description: string }[];
    recipe_note: { text: string }[];
    recipe_tag: { tag: { id: number; text: string } }[];
    measured_ingredient: {
      ingredient: ingredient;
      unit: unit;
      min_amount: string;
      max_amount: string;
      instructions: string;
      alternative_measurement: {
        unit: unit;
        min_amount: string;
        max_amount: string;
      }[];
    }[];
  };
}
