import { recipe_version } from '@prisma/client';
import { RootAction } from '@twocats/store';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { loadRecipesAsync } from './actions';

const reducer = combineReducers({
  loading: createReducer<boolean, RootAction>(false)
    .handleAction([loadRecipesAsync.request], () => true)
    .handleAction([loadRecipesAsync.success, loadRecipesAsync.failure], () => false),
  recipes: createReducer<recipe_version[], RootAction>([])
    .handleAction([loadRecipesAsync.success], (_, action) => action.payload),
});

export default reducer;