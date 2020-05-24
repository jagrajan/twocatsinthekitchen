import {
  RE_FETCH_DASHBOARD_RECIPES,
  RE_FETCH_DASHBOARD_RECIPES_SUCCESS,
  RE_FETCH_ALL_INGREDIENTS,
  RE_FETCH_ALL_INGREDIENTS_SUCCESS,
  RE_FETCH_ALL_UNITS,
  RE_FETCH_ALL_UNITS_SUCCESS,
  RE_ADD_INGREDIENT,
  RE_REMOVE_INGREDIENT,
  RE_SWAP_INGREDIENTS,
  RE_ADD_STEP,
  RE_REMOVE_STEP,
  RE_SWAP_STEPS,
  AddIngredientAction,
  RemoveIngredientAction,
  SwapIngredientsAction,
  AddStepAction,
  RemoveStepAction,
  SwapStepsAction,
  RecipeEditorActionTypes,
  RecipeEditorState,
} from './types';

const INITIAL_STATE: RecipeEditorState = {
  dashboardRecipes: [],
  ingredients: [],
  units: [],
  recipe: {
    ingredients: [],
    steps: [],
  },
};

const addIngredient = (
  state: RecipeEditorState,
  action: AddIngredientAction
) => {
  const ingredients = [ ...state.recipe.ingredients ];
  const position = ingredients.length;
  ingredients.push(action.payload.ingredient);
  ingredients[position].position = position;
  const recipe = { ...state.recipe };
  recipe.ingredients = ingredients;
  return { ...state, recipe };
};

const removeIngredient = (
  state: RecipeEditorState,
  action: RemoveIngredientAction
) => {
  const ingredients = state.recipe.ingredients
    .filter(x => x.position !== action.payload.position)
    .map((ing, index) => ({ ...ing, position: index }));
  const recipe = { ...state.recipe };
  recipe.ingredients = ingredients;
  return { ...state, recipe };
}

const swapIngredients = (
  state: RecipeEditorState,
  action: SwapIngredientsAction
) => {
  const ingredients = [ ...state.recipe.ingredients ];
  let a = action.payload.a;
  let b = action.payload.b;
  if (a < 0) {
    a = ingredients.length - 1;
  }
  if (b >= ingredients.length) {
    b = 0;
  }
  const tmp = ingredients[a];
  ingredients[a] = ingredients[b];
  ingredients[b] = tmp;
  ingredients[a].position = a;
  ingredients[b].position = b;
  const recipe = { ...state.recipe };
  recipe.ingredients = ingredients;
  return { ...state, recipe };
};

const addStep = (
  state: RecipeEditorState,
  action: AddStepAction
) => {
  const steps = [ ...state.recipe.steps ];
  const position = steps.length;
  steps.push(action.payload.step);
  steps[position].position = position;
  const recipe = { ...state.recipe };
  recipe.steps = steps;
  return { ...state, recipe };
};

const removeStep = (
  state: RecipeEditorState,
  action: RemoveStepAction
) => {
  const steps = state.recipe.steps
    .filter(x => x.position !== action.payload.position)
    .map((ing, index) => ({ ...ing, position: index }));
  const recipe = { ...state.recipe };
  recipe.steps = steps;
  return { ...state, recipe };
}

const swapSteps = (
  state: RecipeEditorState,
  action: SwapStepsAction
) => {
  const steps = [ ...state.recipe.steps ];
  let a = action.payload.a;
  let b = action.payload.b;
  if (a < 0) {
    a = steps.length - 1;
  }
  if (b >= steps.length) {
    b = 0;
  }
  const tmp = steps[a];
  steps[a] = steps[b];
  steps[b] = tmp;
  steps[a].position = a;
  steps[b].position = b;
  const recipe = { ...state.recipe };
  recipe.steps = steps;
  return { ...state, recipe };
};

const reducer = (state: RecipeEditorState = INITIAL_STATE,
                 action: RecipeEditorActionTypes) => {
  switch(action.type) {
    case RE_FETCH_DASHBOARD_RECIPES:
      return state;
    case RE_FETCH_DASHBOARD_RECIPES_SUCCESS:
      return { ...state, dashboardRecipes: action.payload.recipes };
    case RE_FETCH_ALL_INGREDIENTS:
      return state;
    case RE_FETCH_ALL_INGREDIENTS_SUCCESS:
      return { ...state, ingredients: action.payload.ingredients };
    case RE_FETCH_ALL_UNITS:
      return state;
    case RE_FETCH_ALL_UNITS_SUCCESS:
      return { ...state, units: action.payload.units };
    case RE_ADD_INGREDIENT:
      return addIngredient(state, action);
    case RE_REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case RE_SWAP_INGREDIENTS:
      return swapIngredients(state, action);
    case RE_ADD_STEP:
      return addStep(state, action);
    case RE_REMOVE_STEP:
      return removeStep(state, action);
    case RE_SWAP_STEPS:
      return swapSteps(state, action);
    default:
      return state;
  }
};

export default reducer;
