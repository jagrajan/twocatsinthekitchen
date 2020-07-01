import { ActionType, createReducer } from 'typesafe-actions';
import { ingredient, recipe_version, tag, unit } from '@twocats/server/node_modules/.prisma/client';
import { DashboardRecipe } from 'services/api/api-recipe-editor';
import { List } from 'immutable';
import { RootAction } from '@twocats/store';
import { combineReducers } from 'redux';
import {
  addIngredient,
  addNote,
  addStep, addTag,
  clearRecipe,
  createIngredientAsync,
  createRecipeAsync,
  createUnitAsync,
  loadAllIngredientsAsync, loadAllTagsAsync,
  loadAllUnitsAsync,
  loadDashboardRecipesAsync,
  loadRecipeDetailsAsync, loadRecipeReleaseAsync, loadRecipeVersionsAsync,
  MeasuredIngredient,
  removeIngredient,
  removeNote,
  removeStep, removeTag,
  setImageData,
  setIngredients,
  setIntroduction,
  setNotes,
  setPreviewImage,
  setRecipeId,
  setSteps, setTags,
  swapIngredients,
  swapNotes,
  swapSteps,
  Tag,
  updateRecipeReleaseAsync,
  uploadRecipeImageAsync,
} from './actions';
import { RecipeRelease } from './types';

function fixSwapPositions(
  indices: [number, number],
  count: number,
): [number, number] {
  const [a, b] = indices;
  return [(a + count) % count, (b + count) % count];
}

function swap<T>(indices_: [number, number], list: List<T>) {
  const indices = fixSwapPositions(indices_, list.count());
  console.log(indices);
  const a = list.get(indices[0]);
  const b = list.get(indices[1]);
  let ret = list;
  if (a && b) {
    ret = list.set(indices[0], b);
    ret = ret.set(indices[1], a);
  }
  return ret;
}

const reducer = combineReducers({
  creatingIngredient: createReducer<boolean, RootAction>(false)
    .handleAction(createIngredientAsync.request, () => true)
    .handleAction(loadAllIngredientsAsync.success, () => false),
  creatingUnit: createReducer<boolean, RootAction>(false)
    .handleAction(createUnitAsync.request, () => true)
    .handleAction(loadAllUnitsAsync.success, () => false),
  ingredients: createReducer<ingredient[], RootAction>([]).handleAction(
    loadAllIngredientsAsync.success,
    (_, action) => action.payload,
  ),
  loading: createReducer<boolean, RootAction>(false)
    .handleAction(
      [
        createRecipeAsync.request,
        uploadRecipeImageAsync.request,
        loadRecipeDetailsAsync.request,
      ],
      () => true,
    )
    .handleAction(
      [
        createRecipeAsync.success,
        createRecipeAsync.failure,
        uploadRecipeImageAsync.failure,
        loadRecipeDetailsAsync.failure,
        setIntroduction,
      ],
      () => false,
    ),
  recipe: combineReducers({
    imageData: createReducer<string | null, RootAction>(null)
      .handleAction(setImageData, (_, action) => action.payload)
      .handleAction(clearRecipe, () => null),
    imageFile: createReducer<string | null, RootAction>(null).handleAction(
      uploadRecipeImageAsync.success,
      (_, action) => action.payload,
    ),
    ingredients: createReducer<List<MeasuredIngredient>, RootAction>(List())
      .handleAction(addIngredient, (state, action) => state.push(action.payload))
      .handleAction(removeIngredient, (state, action) => state.remove(action.payload))
      .handleAction(swapIngredients, (state, action) => swap<MeasuredIngredient>(
        action.payload, state,
      ))
      .handleAction(setIngredients, (_, action) => List(action.payload))
      .handleAction(clearRecipe, () => List()),
    introduction: createReducer<string, RootAction>('').handleAction(
      setIntroduction,
      (_, action) => action.payload,
    ),
    notes: createReducer<List<string>, RootAction>(List())
      .handleAction(addNote, (state, action) => state.push(action.payload))
      .handleAction(removeNote, (state, action) => state.remove(action.payload))
      .handleAction(swapNotes, (state, action) => swap<string>(action.payload, state))
      .handleAction(setNotes, (_, action) => List(action.payload))
      .handleAction(clearRecipe, () => List()),
    previewImage: createReducer<string, RootAction>('')
      .handleAction(setPreviewImage, (_, action) => action.payload),
    recipeId: createReducer<number | null, RootAction>(null)
      .handleAction(setRecipeId, (_, action) => action.payload)
      .handleAction(clearRecipe, () => null),
    steps: createReducer<List<string>, RootAction>(List())
      .handleAction(addStep, (state, action) => state.push(action.payload))
      .handleAction(removeStep, (state, action) => state.remove(action.payload))
      .handleAction(swapSteps, (state, action) => swap<string>(action.payload, state))
      .handleAction(setSteps, (_, action) => List(action.payload))
      .handleAction(clearRecipe, () => List()),
    tags: createReducer<List<Tag>, RootAction>(List())
      .handleAction(addTag, (state, action) => state.push(action.payload))
      .handleAction(removeTag, (state, action) => state.remove(action.payload))
      .handleAction(setTags, (state, action) => List(action.payload)),
  }),
  recipeDashboard: combineReducers({
    dashboardRecipes: createReducer<
      DashboardRecipe[],
      ActionType<typeof loadDashboardRecipesAsync>
      >([]).handleAction(
      loadDashboardRecipesAsync.success,
      (_, action) => action.payload,
    ),
    isLoadingDashboardRecipes: createReducer(false as boolean)
      .handleAction([loadDashboardRecipesAsync.request], () => false)
      .handleAction(
        [loadDashboardRecipesAsync.success, loadDashboardRecipesAsync.failure],
        () => false,
      ),
  }),
  recipeOverview: combineReducers({
    release: createReducer<RecipeRelease | null, RootAction>(null)
      .handleAction(loadRecipeReleaseAsync.request, () => null)
      .handleAction([loadRecipeReleaseAsync.success, updateRecipeReleaseAsync.success], (_, action) => action.payload),
    versions: createReducer<recipe_version[], RootAction>([])
      .handleAction(loadRecipeVersionsAsync.request, () => [])
      .handleAction(loadRecipeVersionsAsync.success, (_, action) => action.payload),
  }),
  tags: createReducer<tag[], RootAction>([]).handleAction(
    loadAllTagsAsync.success,
    (_, action) => action.payload
  ),
  units: createReducer<unit[], RootAction>([]).handleAction(
    loadAllUnitsAsync.success,
    (_, action) => action.payload,
  ),
});

export default reducer;
