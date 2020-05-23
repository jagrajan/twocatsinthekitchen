export const RE_FETCH_DASHBOARD_RECIPES = 'RE_FETCH_DASHBOARD_RECIPES';
export const RE_FETCH_DASHBOARD_RECIPES_SUCCESS = 'RE_FETCH_DASHBOARD_RECIPES_SUCCESS';

export type FetchDashboardRecipesAction = {
  type: typeof RE_FETCH_DASHBOARD_RECIPES;
}

export type FetchDashboardRecipesSuccessAction = {
  type: typeof RE_FETCH_DASHBOARD_RECIPES_SUCCESS;
  payload: {
    recipes: DashboardRecipes;
  };
}

export type RecipeEditorActionTypes = FetchDashboardRecipesAction
  | FetchDashboardRecipesSuccessAction;

export type DashboardRecipes = Array<{
  id: number;
  name: string;
  latest_version: number;
  released_version: number;
  last_update: string;
  create_date: string;
  hidden: boolean;
}>

export type RecipeEditorState = {
  dashboardRecipes: DashboardRecipes;
}
