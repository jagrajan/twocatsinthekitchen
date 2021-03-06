import {
  ingredient,
  recipe_version,
  tag,
  unit,
} from '@prisma/client';
import { Request, Response } from '@twocats/types';
import { RecipeRelease } from '../../store/recipeEditor/types';
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

export async function loadAllTags(): Promise<tag[]> {
  const res = await axios.get<tag[]>('/tag');
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
): Promise<Response.RecipeDetails> {
  const res = await axios.get<Response.RecipeDetails>(`/recipe/version/${version}`);
  return res.data;
}

export async function loadRecipeVersions(
  version: number | string
): Promise<recipe_version[]> {
  const res = await axios.get<recipe_version[]>(`/recipe/versions/${version}`);
  return res.data;
}

export async function loadRecipeRelease(
  id: number | string
): Promise<RecipeRelease> {
  const res = await axios.get<RecipeRelease>(`/recipe/release/${id}`);
  return res.data;
}

export async function updateRecipeRelease(
  id: number | string,
  versionId: number | string
): Promise<RecipeRelease> {
  const res = await axios.post<RecipeRelease>(`/recipe/release/${id}`, { id: versionId });
  return res.data;
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
  recipe: Request.CreateRecipe
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

export async function createTag(text: string): Promise<tag> {
  const res = await axios.post<tag>('/tag', { text });
  return res.data;
}

export async function createUnit(data: {
  name: string;
  plural: string;
}): Promise<unit> {
  const res = await axios.post<unit>('/unit', data);
  return res.data;
}
