import { RootEpic } from '@twocats/store';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { addMessage } from '../feedback/actions';
import { loadNotesAsync, loadRecentRecipesAsync, loadRecipeDetailsAsync, updateNotesAsync } from './actions';

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

export const loadNotesEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadNotesAsync.request)),
    switchMap((action) =>
      from(api.recipe.loadNotes(action.payload)).pipe(
        map(x => loadNotesAsync.success(x)),
        catchError((err) => of(loadNotesAsync.failure(err)))
      )
    )
  );

export const updateNotesEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateNotesAsync.request)),
    switchMap((action) =>
      from(api.recipe.updateNotes(action.payload.id, action.payload.notes)).pipe(
        mergeMap(x =>
          of(
            addMessage({
              key: 'update-notes',
              color: 'success',
              message: 'Your notes have been updated!',
            }),
            updateNotesAsync.success(x)
          )
        ),
        catchError((err) => of(updateNotesAsync.failure(err)))
      )
    )
  );
