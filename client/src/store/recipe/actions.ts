import { createAction, createAsyncAction } from 'typesafe-actions';
import { RecipeDetails } from '@twocats/server/src/types/responses';
import { recipe_version } from '@twocats/server/node_modules/.prisma/client';

export const loadRecentRecipesAsync = createAsyncAction(
  '@recipe/LOAD_RECENT_RECIPES_REQUEST',
  '@recipe/LOAD_RECENT_RECIPES_SUCCESS',
  '@recipe/LOAD_RECENT_RECIPES_FAILURE',
)<undefined, recipe_version[], undefined>();

export const loadRecipeDetailsAsync = createAsyncAction(
  '@recipe/LOAD_RECIPE_DETAILS_REQUEST',
  '@recipe/LOAD_RECIPE_DETAILS_SUCCESS',
  '@recipe/LOAD_RECIPE_DETAILS_FAILURE',
)<string | number, RecipeDetails, Error>();

export const setRecipeScale = createAction('@recipe/SET_RECIPE_SCALE')<number>();
