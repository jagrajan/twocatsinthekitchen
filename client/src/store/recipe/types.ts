import { RecipeDefinition } from '../../../../server/src/models/cookbook/Recipe';
import { RecipeVersionDefinition } from '../../../../server/src/models/cookbook/RecipeVersion';

export const RECIPE_FETCH_RECENTS = 'RECIPE_FETCH_RECENTS';
export const RECIPE_SUCCESS_FETCH_RECENTS = 'RECIPE_SUCCESS_FETCH_RECENTS';

export const RECIPE_FETCH_DETAILS = 'RECIPE_FETCH_DETAILS';
export const RECIPE_SUCCESS_FETCH_DETAILS = 'RECIPE_SUCCESS_FETCH_DETAILS';

export type RecipeFetchRecentsAction = {
  type: typeof RECIPE_FETCH_RECENTS;
}

export type RecipeSuccessFetchRecentsAction = {
  type: typeof RECIPE_SUCCESS_FETCH_RECENTS;
  payload: {
    recipes: Array<RecipeShortInformation>
  }
}

export type RecipeFetchDetailsAction = {
  type: typeof RECIPE_FETCH_DETAILS;
};

export type RecipeSuccessFetchDetailsAction = {
  type: typeof RECIPE_SUCCESS_FETCH_DETAILS;
  payload: {
    recipe: RecipeDetails
  }
};

export type RecipeActionTypes =
  RecipeFetchRecentsAction
  | RecipeSuccessFetchRecentsAction
  | RecipeFetchDetailsAction
  | RecipeSuccessFetchDetailsAction;

export type RecipeShortInformation = {
  metadata: RecipeDefinition;
  info: RecipeVersionDefinition;
}

export type RecipeDetails = RecipeShortInformation & {
  ingredients: {
    position: number;
    min_amount: string;
    max_amount: string;
    unit_name: string;
    unit_plural: string;
    ingredient_name: string;
    ingredient_plural: string;
  }[],
  notes: {
    text: string;
    position: number;
  }[],
  steps: {
    description: string;
    position: number;
  }[],
}

export type RecipeState = {
  fetchingRecipes?: boolean;
  recentRecipes?: Array<RecipeShortInformation>;
  recipeDetails?: RecipeDetails
};
