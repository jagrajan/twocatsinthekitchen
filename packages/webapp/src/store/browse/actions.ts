import { createAsyncAction } from 'typesafe-actions';
import { recipe_version } from '@prisma/client';

export const loadRecipesAsync = createAsyncAction(
  '@browse/LOAD_RECIPES_REQUEST',
  '@browse/LOAD_RECIPES_SUCCESS',
  '@browse/LOAD_RECIPES_FAILURE',
)<undefined, recipe_version[], any>();