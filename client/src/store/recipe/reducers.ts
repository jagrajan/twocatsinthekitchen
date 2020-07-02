import { recipe_version } from '@twocats/server/node_modules/.prisma/client';
import { RecipeDetails } from '@twocats/server/src/types/responses';
import { RootAction } from '@twocats/store';
import { combineReducers } from 'redux';
import { ActionType, createReducer } from 'typesafe-actions';

import { loadRecentRecipesAsync, loadRecipeDetailsAsync, setRecipeScale } from './actions';

const reducer = combineReducers({
  isLoadingRecentRecipes: createReducer(false as boolean)
    .handleAction([loadRecentRecipesAsync.request], () => false)
    .handleAction([loadRecentRecipesAsync.success, loadRecentRecipesAsync.failure], () => false),
  isLoadingRecipePage: createReducer<boolean, RootAction>(false)
    .handleAction(loadRecipeDetailsAsync.request, () => true)
    .handleAction(loadRecipeDetailsAsync.success, () => false),
  recentRecipes: createReducer<recipe_version[], ActionType<typeof loadRecentRecipesAsync>>([])
    .handleAction(loadRecentRecipesAsync.success, (_, action) => action.payload),
  recipe: createReducer<RecipeDetails | null, RootAction>(null)
    .handleAction([loadRecipeDetailsAsync.success], (_, action) => action.payload),
  scale: createReducer<number, RootAction>(1)
    .handleAction(setRecipeScale, (_, action) => action.payload),
});

export default reducer;
