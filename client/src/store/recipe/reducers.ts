import { combineReducers } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';
import { recipe_version } from '@twocats/server/node_modules/.prisma/client';

import {
  loadRecentRecipesAsync
} from './actions';

const reducer = combineReducers({
  isLoadingRecentRecipes: createReducer(false as boolean)
    .handleAction([loadRecentRecipesAsync.request], () => false)
    .handleAction([loadRecentRecipesAsync.success, loadRecentRecipesAsync.failure], () => false),
  recentRecipes: createReducer<recipe_version[], ActionType<typeof loadRecentRecipesAsync>>([])
    .handleAction(loadRecentRecipesAsync.success, (_, action) => action.payload)
});

export default reducer;
