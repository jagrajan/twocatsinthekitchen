import { RootEpic } from '@twocats/store';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, withLatestFrom, mergeMap, exhaustMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { CreateRecipeBody } from '@twocats/server/src/types/requests';
import { push } from 'connected-react-router';
import { initialize } from 'redux-form';
import { IMAGE_SERVER } from 'config';
import {
  loadDashboardRecipesAsync,
  loadAllIngredientsAsync,
  loadAllUnitsAsync,
  loadRecipeDetailsAsync,
  createRecipeAsync,
  uploadRecipeImageAsync,
  setNotes,
  setIngredients,
  setSteps,
  setRecipeId,
  setImageData
} from './actions';

export const loadDashboardRecipesEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadDashboardRecipesAsync.request)),
    switchMap(() =>
      from(api.recipeEditor.loadRecentRecipes()).pipe(
        map(x => loadDashboardRecipesAsync.success(x)),
        catchError(() => of(loadDashboardRecipesAsync.failure()))
      )
    )
  );

export const loadAllIngredientsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadAllIngredientsAsync.request)),
    switchMap(() =>
      from(api.recipeEditor.loadAllIngredients()).pipe(
        map(x => loadAllIngredientsAsync.success(x)),
        catchError(() => of(loadAllIngredientsAsync.failure()))
      )
    )
  );

export const loadAllUnitsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadAllUnitsAsync.request)),
    switchMap(() =>
      from(api.recipeEditor.loadAllUnits()).pipe(
        map(x => loadAllUnitsAsync.success(x)),
        catchError(() => of(loadAllUnitsAsync.failure()))
      )
    )
  );

export const createRecipeEpic: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf([createRecipeAsync.request, uploadRecipeImageAsync.success])),
    withLatestFrom(state$),
    switchMap(([, state]) =>
      from((()  => {
        const recipe: CreateRecipeBody = {
          steps: state.recipeEditor.recipe.steps.toArray(),
          notes: state.recipeEditor.recipe.notes.toArray(),
          ingredients: state.recipeEditor.recipe.ingredients.map(ing => ({
            minAmount: ing.minAmount,
            maxAmount: ing.maxAmount,
            unit: ing.unit.id,
            ingredient: ing.ingredient.id,
          })).toArray(),
          recipe_id: state.recipeEditor.recipe.recipeId || undefined,
          name: state.form.recipeEditor?.values?.name || 'No name',
          description: state.form.recipeEditor?.values?.description || 'No name',
          slug: state.form.recipeEditor?.values?.slug || 'error',
          imageFile: state.recipeEditor.recipe.imageFile || 'default.png',
        };
        return api.recipeEditor.createRecipe(recipe);
      })()).pipe(
        mergeMap(x => of(createRecipeAsync.success(x), push({ pathname: '/admin/recipes' }))),
        catchError(() => of(createRecipeAsync.failure()))
      )
    )
  );

export const uploadRecipeImageEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(uploadRecipeImageAsync.request)),
    exhaustMap(action =>
      from(api.recipeEditor.uploadRecipeImage(action.payload)).pipe(
        map(x => uploadRecipeImageAsync.success(x)),
        catchError(() => of(uploadRecipeImageAsync.failure()))
      )
    )
  );

export const loadRecipeDetailsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadRecipeDetailsAsync.request)),
    switchMap(action =>
      from(api.recipeEditor.loadRecipeDetails(action.payload)).pipe(
        map(x => loadRecipeDetailsAsync.success(x)),
        catchError(() => of(loadRecipeDetailsAsync.failure()))
      )
    )
  );

export const setRecipeEditorEpic: RootEpic = action$ =>
  action$.pipe(
    filter(isActionOf(loadRecipeDetailsAsync.success)),
    switchMap(action => {
      const { name, description, slug } = action.payload;
      return of(
        initialize('recipeEditor', { name, description, slug }),
        setNotes(action.payload.recipe_note.map(x => x.text)),
        setSteps(action.payload.recipe_step.map(x => x.description)),
        setIngredients(action.payload.measured_ingredient.map(x => {
          const { unit, ingredient, min_amount, max_amount } = x;
          return {
            unit,
            ingredient,
            minAmount: min_amount,
            maxAmount: max_amount,
          };
        })),
        setRecipeId(action.payload.recipe_id),
        setImageData(`${IMAGE_SERVER}/${action.payload.image_file}`)
      )
    })
  );
