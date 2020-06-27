import { RecipeDetails } from '@twocats/server/src/types/responses';
import { recipe_version } from '@twocats/server/node_modules/.prisma/client';
import axios from '../axios';

export async function loadRecentRecipes(): Promise<recipe_version[]> {
  const res = await axios.get<recipe_version[]>('/recipe/recent');
  return res.data;
}

export async function loadRecipeDetails(id: string | number): Promise<RecipeDetails> {
  const res = await axios.get<RecipeDetails>(`/recipe/${id}`);
  return res.data;
}
