import { recipe_version } from '@prisma/client';
import { Response } from '@twocats/types';
import { RootAction } from '@twocats/store';
import { List } from 'immutable';
import swap from 'utils/swap';
import { combineReducers } from 'redux';
import { ActionType, createReducer } from 'typesafe-actions';

import {
  addNote, loadNotesAsync,
  loadRecentRecipesAsync,
  loadRecipeDetailsAsync,
  removeNote, setNotes,
  setRecipeScale, swapNotes,
  updateNote, updateNotesAsync
} from './actions';

const reducer = combineReducers({
  isLoadingRecentRecipes: createReducer(false as boolean)
    .handleAction([loadRecentRecipesAsync.request], () => false)
    .handleAction([loadRecentRecipesAsync.success, loadRecentRecipesAsync.failure], () => false),
  isLoadingRecipePage: createReducer<boolean, RootAction>(false)
    .handleAction(loadRecipeDetailsAsync.request, () => true)
    .handleAction(loadRecipeDetailsAsync.success, () => false),
  notes: createReducer<List<string>, RootAction>(List())
    .handleAction(updateNotesAsync.success, (_, action) => List(action.payload.map(x => x.text)))
    .handleAction(loadNotesAsync.success, (_, action) => List(action.payload.map(x => x.text)))
    .handleAction(addNote, (state, action) => state.push(action.payload))
    .handleAction(removeNote, (state, action) => state.remove(action.payload))
    .handleAction(setNotes, (state, action) => List(action.payload))
    .handleAction(swapNotes, (state, action) => swap<string>([action.payload.a, action.payload.b], state))
    .handleAction(updateNote, (state, action) => state.set(action.payload.index, action.payload.note)),
  notesLoading: createReducer<boolean, RootAction>(false)
    .handleAction(updateNotesAsync.request, () => true)
    .handleAction(updateNotesAsync.success, () => false),
  recentRecipes: createReducer<recipe_version[], ActionType<typeof loadRecentRecipesAsync>>([])
    .handleAction(loadRecentRecipesAsync.success, (_, action) => action.payload),
  recipe: createReducer<Response.RecipeDetails | null, RootAction>(null)
    .handleAction([loadRecipeDetailsAsync.success], (_, action) => action.payload),
  scale: createReducer<number, RootAction>(1)
    .handleAction(setRecipeScale, (_, action) => action.payload),
});

export default reducer;
