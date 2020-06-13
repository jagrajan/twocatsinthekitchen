import { combineReducers } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';
import { RecipeWithVersion } from 'services/api/api-recipe';

import {
  loadRecentRecipesAsync
} from './actions';

const reducer = combineReducers({
  isLoadingRecentRecipes: createReducer(false as boolean)
    .handleAction([loadRecentRecipesAsync.request], () => false)
    .handleAction([loadRecentRecipesAsync.success, loadRecentRecipesAsync.failure], () => false),
  recentRecipes: createReducer<RecipeWithVersion[], ActionType<typeof loadRecentRecipesAsync>>([])
    .handleAction(loadRecentRecipesAsync.success, (_, action) => action.payload)
});

export default reducer;
