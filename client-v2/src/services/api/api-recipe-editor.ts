import { recipe_version, ingredient, unit } from '@twocats/server/node_modules/.prisma/client';
import axios from '../axios';

export type DashboardRecipe = {
  released: recipe_version | null;
  latest: recipe_version;
  create_date: Date,
  recipe_id: number,
};

export async function loadRecentRecipes(): Promise<DashboardRecipe[]> {
  const res = await axios.get<DashboardRecipe[]>('/recipe/dashboard');
  return res.data;
}

export async function loadAllUnits(): Promise<unit[]> {
  const res = await axios.get<unit[]>('/unit');
  return res.data;
}

export async function loadAllIngredients(): Promise<ingredient[]> {
  const res = await axios.get<ingredient[]>('/ingredient');
  return res.data;
}
