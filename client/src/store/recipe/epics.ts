import { RootEpic } from '@twocats/store';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { loadRecentRecipesAsync, loadRecipeDetailsAsync } from './actions';

export const loadRecentRecipesEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadRecentRecipesAsync.request)),
    switchMap(() =>
      from(api.recipe.loadRecentRecipes()).pipe(
        map(x => loadRecentRecipesAsync.success(x)),
        catchError(() => of(loadRecentRecipesAsync.failure()))
      )
    )
  );

export const loadRecipeDetailsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadRecipeDetailsAsync.request)),
    switchMap((action) =>
      from(api.recipe.loadRecipeDetails(action.payload)).pipe(
        map(x => loadRecipeDetailsAsync.success(x)),
        catchError((err) => of(loadRecipeDetailsAsync.failure(err)))
      )
    )
  );
