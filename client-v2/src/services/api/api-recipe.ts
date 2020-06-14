import { recipe_version } from '@twocats/server/node_modules/.prisma/client';
import axios from '../axios';

export async function loadRecentRecipes(): Promise<recipe_version[]> {
  const res = await axios.get<recipe_version[]>('/recipe/recent');
  return res.data;
}
