import {
  RE_FETCH_DASHBOARD_RECIPES,
  RE_FETCH_DASHBOARD_RECIPES_SUCCESS,
  RecipeEditorActionTypes,
  RecipeEditorState,
} from './types';

const INITIAL_STATE: RecipeEditorState = {
  dashboardRecipes: [],
};

const reducer = (state: RecipeEditorState = INITIAL_STATE,
                 action: RecipeEditorActionTypes) => {
  switch(action.type) {
    case RE_FETCH_DASHBOARD_RECIPES:
      return state;
    case RE_FETCH_DASHBOARD_RECIPES_SUCCESS:
      return { ...state, dashboardRecipes: action.payload.recipes }
    default:
      return state;
  }
};

export default reducer;
