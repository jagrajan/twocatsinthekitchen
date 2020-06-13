import { recipe, recipe_version } from '@twocats/server/node_modules/.prisma/client';
import axios from '../axios';

export type RecipeWithVersion = recipe & {
  recipe_version: recipe_version[],
};

export async function loadRecentRecipes(): Promise<RecipeWithVersion[]> {
  const res = await axios.get<RecipeWithVersion[]>('/recipe/recent');
  return res.data;
}
