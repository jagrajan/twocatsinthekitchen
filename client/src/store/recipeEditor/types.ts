export const RE_FETCH_DASHBOARD_RECIPES = 'RE_FETCH_DASHBOARD_RECIPES';
export const RE_FETCH_DASHBOARD_RECIPES_SUCCESS = 'RE_FETCH_DASHBOARD_RECIPES_SUCCESS';
export const RE_FETCH_ALL_INGREDIENTS = 'RE_FETCH_ALL_INGREDIENTS';
export const RE_FETCH_ALL_INGREDIENTS_SUCCESS = 'RE_FETCH_ALL_INGREDIENTS_SUCCESS';
export const RE_FETCH_ALL_UNITS = 'RE_FETCH_ALL_UNITS';
export const RE_FETCH_ALL_UNITS_SUCCESS = 'RE_FETCH_ALL_UNITS_SUCCESS';
export const RE_ADD_INGREDIENT = 'RE_ADD_INGREDIENT';
export const RE_REMOVE_INGREDIENT = 'RE_REMOVE_INGREDIENT';
export const RE_SWAP_INGREDIENTS = 'RE_SWAP_INGREDIENTS';
export const RE_ADD_STEP = 'RE_ADD_STEP';
export const RE_REMOVE_STEP = 'RE_REMOVE_STEP';
export const RE_SWAP_STEPS = 'RE_SWAP_STEPS';

export type FetchDashboardRecipesAction = {
  type: typeof RE_FETCH_DASHBOARD_RECIPES;
}

export type FetchDashboardRecipesSuccessAction = {
  type: typeof RE_FETCH_DASHBOARD_RECIPES_SUCCESS;
  payload: {
    recipes: DashboardRecipes;
  };
}

export type FetchAllIngredientsAction = {
  type: typeof RE_FETCH_ALL_INGREDIENTS;
}

export type FetchAllIngredientsSuccessAction = {
  type: typeof RE_FETCH_ALL_INGREDIENTS_SUCCESS;
  payload: {
    ingredients: Ingredient[];
  };
}

export type FetchAllUnitsAction = {
  type: typeof RE_FETCH_ALL_UNITS;
}

export type FetchAllUnitsSuccessAction = {
  type: typeof RE_FETCH_ALL_UNITS_SUCCESS;
  payload: {
    units: Unit[];
  };
}

export type AddIngredientAction = {
  type: typeof RE_ADD_INGREDIENT;
  payload: {
    ingredient: RecipeIngredient;
  };
}

export type RemoveIngredientAction = {
  type: typeof RE_REMOVE_INGREDIENT;
  payload: {
    position: number;
  };
}

export type SwapIngredientsAction = {
  type: typeof RE_SWAP_INGREDIENTS;
  payload: {
    a: number;
    b: number;
  };
}

export type AddStepAction = {
  type: typeof RE_ADD_STEP;
  payload: {
    step: RecipeStep;
  };
}

export type RemoveStepAction = {
  type: typeof RE_REMOVE_STEP;
  payload: {
    position: number;
  };
}

export type SwapStepsAction = {
  type: typeof RE_SWAP_STEPS;
  payload: {
    a: number;
    b: number;
  };
}

export type RecipeEditorActionTypes = FetchDashboardRecipesAction
  | FetchDashboardRecipesSuccessAction
  | FetchAllIngredientsAction
  | FetchAllIngredientsSuccessAction
  | FetchAllUnitsAction
  | FetchAllUnitsSuccessAction
  | AddIngredientAction
  | RemoveIngredientAction
  | SwapIngredientsAction
  | AddStepAction
  | RemoveStepAction
  | SwapStepsAction;

export type Unit = {
  id: number;
  name: string;
  plural: string;
}

export type Ingredient = {
  id: number;
  name: string;
  plural?: string;
  unit?: number;
  category?: number;
}

export type RecipeIngredient = {
  ingredient: Ingredient;
  unit: Unit;
  amount: string;
  position: number;
}

export type RecipeStep = {
  position: number;
  description: string;
}

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
  ingredients: Ingredient[];
  units: Unit[];
  recipe: {
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
  };
}
