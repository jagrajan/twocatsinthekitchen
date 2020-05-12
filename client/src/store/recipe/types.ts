import { RecipeDefinition } from '../../../../server/src/models/cookbook/Recipe';
import { RecipeVersionDefinition } from '../../../../server/src/models/cookbook/RecipeVersion';
// import { RecipeDefinition } from 'server/models/cookbook/Recipe';
// import { RecipeVersionDefinition } from 'server/models/cookbook/RecipeVersion';

export const RECIPE_FETCH_RECENTS = 'RECIPE_FETCH_RECENTS';
export const RECIPE_SUCCESS_FETCH_RECENTS = 'RECIPE_SUCCESS_FETCH_RECENTS';

export type RecipeFetchRecentsAction = {
  type: typeof RECIPE_FETCH_RECENTS
}

export type RecipeSuccessFetchRecentsAction = {
  type: typeof RECIPE_SUCCESS_FETCH_RECENTS,
  payload: {
    recipes: Array<RecipeShortInformation>
  }
}

export type RecipeActionTypes =
  RecipeFetchRecentsAction
  | RecipeSuccessFetchRecentsAction;

export type RecipeShortInformation = {
  metadata: RecipeDefinition;
  info: RecipeVersionDefinition;
}

export type RecipeState = {
  fetchingRecipes?: boolean;
  recentRecipes?: Array<RecipeShortInformation>;
};
