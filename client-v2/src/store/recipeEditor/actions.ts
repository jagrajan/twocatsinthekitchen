import { createAsyncAction, createAction } from 'typesafe-actions';

import { DashboardRecipe } from 'services/api/api-recipe-editor';
import { unit, ingredient, recipe_version } from '@twocats/server/node_modules/.prisma/client';

export type Unit = unit;

export type Ingredient = ingredient;

export type MeasuredIngredient = {
  unit: unit;
  ingredient: ingredient;
  minAmount: string;
  maxAmount: string;
}

export const loadDashboardRecipesAsync = createAsyncAction(
  '@recipeEditor/LOAD_DASHBOARD_RECIPES_REQUEST',
  '@recipeEditor/LOAD_DASHBOARD_RECIPES_SUCCESS',
  '@recipeEditor/LOAD_DASHBOARD_RECIPES_FAILURE',
)<undefined, DashboardRecipe[], undefined>();

export const loadAllIngredientsAsync = createAsyncAction(
  '@recipeEditor/LOAD_ALL_INGREDIENTS_REQUEST',
  '@recipeEditor/LOAD_ALL_INGREDIENTS_SUCCESS',
  '@recipeEditor/LOAD_ALL_INGREDIENTS_FAILURE',
)<undefined, ingredient[], undefined>();

export const loadAllUnitsAsync = createAsyncAction(
  '@recipeEditor/LOAD_ALL_UNITS_REQUEST',
  '@recipeEditor/LOAD_ALL_UNITS_SUCCESS',
  '@recipeEditor/LOAD_ALL_UNITS_FAILURE',
)<undefined, unit[], undefined>();

export const createRecipeAsync = createAsyncAction(
  '@recipeEditor/CREATE_RECIPE_REQUEST',
  '@recipeEditor/CREATE_RECIPE_SUCCESS',
  '@recipeEditor/CREATE_RECIPE_FAILURE'
)<undefined, recipe_version, undefined>();

export const addNote = createAction('@recipeEditor/ADD_NOTE')<string>();
export const removeNote = createAction('@recipeEditor/REMOVE_NOTE')<number>();
export const swapNotes = createAction('@recipeEditor/SWAP_NOTES')<[number, number]>();

export const addStep = createAction('@recipeEditor/ADD_STEP')<string>();
export const removeStep = createAction('@recipeEditor/REMOVE_STEP')<number>();
export const swapSteps = createAction('@recipeEditor/SWAP_STEPS')<[number, number]>();

export const addIngredient = createAction('@recipeEditor/ADD_INGREDIENT')<MeasuredIngredient>();
export const removeIngredient = createAction('@recipeEditor/REMOVE_INGREDIENT')<number>();
export const swapIngredients = createAction('@recipeEditor/SWAP_INGREDIENTS')<[number, number]>();
