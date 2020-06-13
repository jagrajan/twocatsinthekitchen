import { RootEpic } from '@twocats/store';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import {
  loadRecentRecipesAsync
} from './actions';

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
