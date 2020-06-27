import { CreateRecipeBody } from '@twocats/server/src/types/requests';
import { RootEpic } from '@twocats/store';
import { IMAGE_SERVER } from 'config';
import { push } from 'connected-react-router';
import { initialize } from 'redux-form';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, mergeMap, switchMap, withLatestFrom, } from 'rxjs/operators';
import { addMessage } from 'store/feedback/actions';
import { isActionOf } from 'typesafe-actions';
import {
  createIngredientAsync,
  createRecipeAsync,
  createUnitAsync,
  loadAllIngredientsAsync,
  loadAllUnitsAsync,
  loadDashboardRecipesAsync,
  loadRecipeDetailsAsync,
  loadRecipeReleaseAsync, loadRecipeVersionsAsync,
  setImageData,
  setIngredients,
  setIntroduction,
  setNotes,
  setRecipeId,
  setSteps, updateRecipeReleaseAsync,
  uploadBlogImageAsync,
  uploadRecipeImageAsync,
} from './actions';

export const loadDashboardRecipesEpic: RootEpic = (action$, _, { api }) => (
  action$.pipe(
    filter(isActionOf(loadDashboardRecipesAsync.request)),
    switchMap(() => (
      from(api.recipeEditor.loadRecentRecipes()).pipe(
        map((x) => loadDashboardRecipesAsync.success(x)),
        catchError(() => of(loadDashboardRecipesAsync.failure())),
      )
    )),
  )
);

export const loadAllIngredientsEpic: RootEpic = (action$, _, { api }) => (
  action$.pipe(
    filter(isActionOf(loadAllIngredientsAsync.request)),
    switchMap(() => (
      from(api.recipeEditor.loadAllIngredients()).pipe(
        map((x) => loadAllIngredientsAsync.success(x)),
        catchError(() => of(loadAllIngredientsAsync.failure())),
      )
    )),
  )
);

export const loadAllUnitsEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(loadAllUnitsAsync.request)),
  switchMap(() => from(api.recipeEditor.loadAllUnits()).pipe(
    map((x) => loadAllUnitsAsync.success(x)),
    catchError(() => of(loadAllUnitsAsync.failure())),
  )),
);

export const createRecipeEpic: RootEpic = (action$, state$, { api }) => action$.pipe(
  filter(isActionOf([createRecipeAsync.request, uploadRecipeImageAsync.success])),
  withLatestFrom(state$),
  switchMap(([, state]) => from((() => {
    const recipe: CreateRecipeBody = {
      steps: state.recipeEditor.recipe.steps.toArray(),
      notes: state.recipeEditor.recipe.notes.toArray(),
      ingredients: state.recipeEditor.recipe.ingredients.map((ing) => ({
        minAmount: ing.minAmount,
        maxAmount: ing.maxAmount,
        unit: ing.unit.id,
        ingredient: ing.ingredient.id,
      })).toArray(),
      recipe_id: state.recipeEditor.recipe.recipeId || undefined,
      name: state.form.recipeEditor?.values?.name || 'No name',
      description: state.form.recipeEditor?.values?.description || 'No name',
      slug: state.form.recipeEditor?.values?.slug || 'error',
      cookTime: state.form.recipeEditor?.values?.cookTime || 'error',
      prepTime: state.form.recipeEditor?.values?.prepTime || 'error',
      servings: parseInt(state.form.recipeEditor?.values?.servings.toString(), 10) || 3,
      imageFile: state.recipeEditor.recipe.imageFile || 'default.png',
      introduction: state.recipeEditor.recipe.introduction,
    };
    return api.recipeEditor.createRecipe(recipe);
  })()).pipe(
    mergeMap((x) => of(createRecipeAsync.success(x), push({ pathname: '/admin/recipes' }))),
    catchError(() => of(createRecipeAsync.failure())),
  )),
);

export const createIngredientEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(createIngredientAsync.request)),
  mergeMap((action) => from(api.recipeEditor.createIngredient(action.payload)).pipe(
    mergeMap((x) => of(
      createIngredientAsync.success(x),
      loadAllIngredientsAsync.request(),
      addMessage({
        key: 'add-ingredient',
        color: 'success',
        message: `${x.name} has been added to the database!`,
      }),
    )),
    catchError((error) => of(createIngredientAsync.failure(error))),
  )),
);

export const createUnitEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(createUnitAsync.request)),
  mergeMap((action) => from(api.recipeEditor.createUnit(action.payload)).pipe(
    mergeMap((x) => of(
      createUnitAsync.success(x),
      loadAllUnitsAsync.request(),
      addMessage({
        key: 'add-unit',
        color: 'success',
        message: `${x.name} has been added to the database!`,
      }),
    )),
    catchError((error) => of(createIngredientAsync.failure(error))),
  )),
);

export const uploadRecipeImageEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(uploadRecipeImageAsync.request)),
  exhaustMap((action) => from(api.recipeEditor.uploadBlogImage(new File([action.payload], 'image.png'))).pipe(
    map((x) => uploadRecipeImageAsync.success(x)),
    catchError(() => of(uploadRecipeImageAsync.failure())),
  )),
);

export const uploadBlogImageEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(uploadBlogImageAsync.request)),
  exhaustMap((action) => from(api.recipeEditor.uploadBlogImage(action.payload)).pipe(
    map((x) => uploadBlogImageAsync.success(x)),
    catchError(() => of(uploadBlogImageAsync.failure())),
  )),
);

export const loadRecipeDetailsEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(loadRecipeDetailsAsync.request)),
  switchMap((action) => from(api.recipeEditor.loadRecipeDetails(action.payload)).pipe(
    map((x) => loadRecipeDetailsAsync.success(x)),
    catchError(() => of(loadRecipeDetailsAsync.failure())),
  )),
);

export const setRecipeEditorEpic: RootEpic = (action$) => action$.pipe(
  filter(isActionOf(loadRecipeDetailsAsync.success)),
  switchMap((action) => {
    const { name, description, slug, cook_time, prep_time, serves } = action.payload;
    return of(
      initialize('recipeEditor', { name, description, slug, cookTime: cook_time, prepTime: prep_time, servings: serves }),
      setNotes(action.payload.recipe_note.map((x) => x.text)),
      setSteps(action.payload.recipe_step.map((x) => x.description)),
      setIngredients(action.payload.measured_ingredient.map((x) => {
        const {
          unit, ingredient, min_amount, max_amount,
        } = x;
        return {
          ingredient,
          maxAmount: max_amount,
          minAmount: min_amount,
          unit,
        };
      })),
      setRecipeId(action.payload.recipe_id),
      setImageData(`${IMAGE_SERVER}/${action.payload.image_file}`),
      setIntroduction(action.payload.introduction || ''),
    );
  }),
);

export const loadRecipeReleaseEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(loadRecipeReleaseAsync.request)),
  switchMap((action) => from(api.recipeEditor.loadRecipeRelease(action.payload)).pipe(
    map((x) => loadRecipeReleaseAsync.success(x)),
    catchError((error) => of(loadRecipeReleaseAsync.failure(error))),
  )),
);

export const updateRecipeReleaseEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(updateRecipeReleaseAsync.request)),
  switchMap((action) => from(api.recipeEditor.updateRecipeRelease(action.payload.id, action.payload.versionId)).pipe(
    map((x) => updateRecipeReleaseAsync.success(x)),
    catchError((error) => of(updateRecipeReleaseAsync.failure(error))),
  )),
);

export const loadRecipeVersionsEpic: RootEpic = (action$, _, { api }) => action$.pipe(
  filter(isActionOf(loadRecipeVersionsAsync.request)),
  switchMap((action) => from(api.recipeEditor.loadRecipeVersions(action.payload)).pipe(
    map((x) => loadRecipeVersionsAsync.success(x)),
    catchError((error) => of(loadRecipeVersionsAsync.failure(error))),
  )),
);
