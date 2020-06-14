import { combineReducers } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';
import { DashboardRecipe } from 'services/api/api-recipe-editor';
import { RootAction } from '@twocats/store';
import { List } from 'immutable';
import { unit, ingredient } from '@twocats/server/node_modules/.prisma/client';

import {
  MeasuredIngredient,
  loadAllUnitsAsync,
  loadAllIngredientsAsync,
  loadDashboardRecipesAsync,
  addNote,
  removeNote,
  swapNotes,
  addStep,
  removeStep,
  swapSteps,
  addIngredient,
  removeIngredient,
  swapIngredients
} from './actions';

function fixSwapPositions(indices: [number, number], count: number): [number, number] {
  const [a, b] = indices;
  return [(a + count) % count, (b + count) % count];
}

function swap<T>(indices: [number, number], list: List<T>) {
  indices = fixSwapPositions(indices, list.count());
  const a = list.get(indices[0]);
  const b = list.get(indices[1]);
  if (a && b) {
    list = list.set(indices[0], b);
    list = list.set(indices[1], a);
  }
  return list;
}

const reducer = combineReducers({
  recipeDashboard: combineReducers({
    isLoadingDashboardRecipes: createReducer(false as boolean)
      .handleAction([loadDashboardRecipesAsync.request], () => false)
      .handleAction([loadDashboardRecipesAsync.success, loadDashboardRecipesAsync.failure], () => false),
    dashboardRecipes: createReducer<DashboardRecipe[], ActionType<typeof loadDashboardRecipesAsync>>([])
      .handleAction(loadDashboardRecipesAsync.success, (_, action) => action.payload)
  }),
  recipe: combineReducers({
    notes: createReducer<List<string>, RootAction>(List())
      .handleAction(addNote, (state, action) => state.push(action.payload))
      .handleAction(removeNote, (state, action) => state.remove(action.payload))
      .handleAction(swapNotes, (state, action) => swap<string>(action.payload, state)),
    steps: createReducer<List<string>, RootAction>(List())
      .handleAction(addStep, (state, action) => state.push(action.payload))
      .handleAction(removeStep, (state, action) => state.remove(action.payload))
      .handleAction(swapSteps, (state, action) => swap<string>(action.payload, state)),
    ingredients: createReducer<List<MeasuredIngredient>, RootAction>(List())
      .handleAction(addIngredient, (state, action) => state.push(action.payload))
      .handleAction(removeIngredient, (state, action) => state.remove(action.payload))
      .handleAction(swapIngredients, (state, action) => swap<MeasuredIngredient>(action.payload, state))
  }),
  ingredients: createReducer<ingredient[], RootAction>([])
    .handleAction(loadAllIngredientsAsync.success, (_, action) => action.payload),
  units: createReducer<unit[], RootAction>([])
    .handleAction(loadAllUnitsAsync.success, (_, action) => action.payload),
});

export default reducer;
