import { RootEpic } from '@twocats/store';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { loadRecipesAsync } from './actions';

export const loadRecipesEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadRecipesAsync.request)),
    switchMap(() =>
      from(api.recipe.loadRecipes()).pipe(
        map(x => loadRecipesAsync.success(x)),
        catchError((err) => of(loadRecipesAsync.failure(err)))
      )
    )
  );