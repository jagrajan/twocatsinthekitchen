import { createAsyncAction } from 'typesafe-actions';
import { recipe_version } from '@twocats/server/node_modules/.prisma/client';

export const loadRecentRecipesAsync = createAsyncAction(
  '@recipe/LOAD_RECENT_RECIPES_REQUEST',
  '@recipe/LOAD_RECENT_RECIPES_SUCCESS',
  '@recipe/LOAD_RECENT_RECIPES_FAILURE',
)<undefined, recipe_version[], undefined>();
