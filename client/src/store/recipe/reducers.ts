import{
  RECIPE_FETCH_RECENTS,
  RECIPE_SUCCESS_FETCH_RECENTS,
  RECIPE_FETCH_DETAILS,
  RECIPE_SUCCESS_FETCH_DETAILS,
  RecipeState,
  RecipeActionTypes
} from './types';

const INITIAL_STATE: RecipeState = {
  fetchingRecipes: false,
};

const reducer = (state: RecipeState = INITIAL_STATE,
                 action: RecipeActionTypes) => {
  switch(action.type) {
    case RECIPE_FETCH_RECENTS:
    case RECIPE_FETCH_DETAILS:
      return { ...state, fetchingRecipes: true };
    case RECIPE_SUCCESS_FETCH_RECENTS:
      return {
        ...state,
        fetchingRecipes: false,
        recentRecipes: action.payload.recipes
      };
    case RECIPE_SUCCESS_FETCH_DETAILS:
      return {
        ...state,
        fetchingRecipes: false,
        recipeDetails: action.payload.recipe
      };
    default:
      return state;
  }
};

export default reducer;
