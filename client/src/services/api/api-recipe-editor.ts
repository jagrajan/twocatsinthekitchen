import {
  ingredient,
  recipe_version,
  unit,
} from '@twocats/server/node_modules/.prisma/client';
import { CreateRecipeBody } from '@twocats/server/src/types/requests';
import { RecipeDetails } from '@twocats/server/src/types/responses';
import axios from '../axios';

export type DashboardRecipe = {
  released: recipe_version | null;
  latest: recipe_version;
  create_date: Date;
  recipe_id: number;
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

export async function loadRecipeDetails(
  version: number
): Promise<RecipeDetails> {
  const res = await axios.get<RecipeDetails>(`/recipe/version/${version}`);
  return res.data;
}

export async function uploadRecipeImage(data: string): Promise<string> {
  const res = await axios.post<{ filename: string }>('/image', { data });
  return res.data.filename;
}

export async function uploadBlogImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('blogImage', file);
  const res = await axios.post<{ filename: string }>('/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.filename;
}

export async function createRecipe(
  recipe: CreateRecipeBody
): Promise<recipe_version> {
  const res = await axios.post<recipe_version>('/recipe', recipe);
  return res.data;
}

export async function createIngredient(data: {
  name: string;
  plural: string;
}): Promise<ingredient> {
  const res = await axios.post<ingredient>('/ingredient', data);
  return res.data;
}

export async function createUnit(data: {
  name: string;
  plural: string;
}): Promise<unit> {
  const res = await axios.post<unit>('/unit', data);
  return res.data;
}
