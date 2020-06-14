import { RootEpic } from '@twocats/store';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { CreateRecipeBody } from '@twocats/server/src/types/requests';
import { recipe_version } from '@twocats/server/node_modules/.prisma/client';
import {
  loadDashboardRecipesAsync,
  loadAllIngredientsAsync,
  loadAllUnitsAsync,
  createRecipeAsync,
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
    filter(isActionOf(createRecipeAsync.request)),
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
          name: state.form.recipeCreator?.values?.name || 'No name',
          description: state.form.recipeCreator?.values?.description || 'No name',
        };
        return api.recipeEditor.createRecipe(recipe);
      })()).pipe(
        map(x => createRecipeAsync.success(x)),
        catchError(() => of(createRecipeAsync.failure()))
      )
    )
  );
