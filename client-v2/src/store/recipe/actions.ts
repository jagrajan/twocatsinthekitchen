import { createAsyncAction } from 'typesafe-actions';
import { RecipeWithVersion } from 'services/api/api-recipe';

export const loadRecentRecipesAsync = createAsyncAction(
  '@recipe/LOAD_RECENT_RECIPES_REQUEST',
  '@recipe/LOAD_RECENT_RECIPES_SUCCESS',
  '@recipe/LOAD_RECENT_RECIPES_FAILURE',
)<undefined, RecipeWithVersion[], undefined>();
