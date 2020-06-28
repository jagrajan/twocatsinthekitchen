import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  ingredient,
  recipe_version,
  unit,
} from '@twocats/server/node_modules/.prisma/client';
import { DashboardRecipe } from 'services/api/api-recipe-editor';
import { RecipeDetails } from '@twocats/server/src/types/responses';
import { RecipeRelease} from './types';

export type Unit = unit;

export type Ingredient = ingredient;

export type MeasuredIngredient = {
  alternativeMeasurement: {
    maxAmount: string;
    minAmount: string;
    unit: unit;
  }[];
  ingredient: ingredient;
  maxAmount: string;
  minAmount: string;
  unit: unit;
};

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
  '@recipeEditor/CREATE_RECIPE_FAILURE',
)<undefined, recipe_version, undefined>();

export const loadRecipeDetailsAsync = createAsyncAction(
  '@recipeEditor/LOAD_RECIPE_DETAILS_REQUEST',
  '@recipeEditor/LOAD_RECIPE_DETAILS_SUCCESS',
  '@recipeEditor/LOAD_RECIPE_DETAILS_FAILURE',
)<number, RecipeDetails, undefined>();

export const uploadRecipeImageAsync = createAsyncAction(
  '@recipeEditor/UPLOAD_RECIPE_IMAGE_REQUEST',
  '@recipeEditor/UPLOAD_RECIPE_IMAGE_SUCCESS',
  '@recipeEditor/UPLOAD_RECIPE_IMAGE_FAILURE',
)<Blob, string, undefined>();

export const uploadBlogImageAsync = createAsyncAction(
  '@recipeEditor/UPLOAD_BLOG_IMAGE_REQUEST',
  '@recipeEditor/UPLOAD_BLOG_IMAGE_SUCCESS',
  '@recipeEditor/UPLOAD_BLOG_IMAGE_FAILURE',
)<File, string, undefined>();

export const createIngredientAsync = createAsyncAction(
  '@recipeEditor/CREATE_INGREDIENT_REQUEST',
  '@recipeEditor/CREATE_INGREDIENT_SUCCESS',
  '@recipeEditor/CREATE_INGREDIENT_FAILURE',
)<{ name: string; plural: string }, ingredient, Error>();

export const createUnitAsync = createAsyncAction(
  '@recipeEditor/CREATE_UNIT_REQUEST',
  '@recipeEditor/CREATE_UNIT_SUCCESS',
  '@recipeEditor/CREATE_UNIT_FAILURE',
)<{ name: string; plural: string }, unit, Error>();

export const addNote = createAction('@recipeEditor/ADD_NOTE')<string>();
export const removeNote = createAction('@recipeEditor/REMOVE_NOTE')<number>();
export const swapNotes = createAction('@recipeEditor/SWAP_NOTES')<
[number, number]
>();
export const setNotes = createAction('@recipeEditor/SET_NOTES')<string[]>();

export const addStep = createAction('@recipeEditor/ADD_STEP')<string>();
export const removeStep = createAction('@recipeEditor/REMOVE_STEP')<number>();
export const swapSteps = createAction('@recipeEditor/SWAP_STEPS')<
[number, number]
>();
export const setSteps = createAction('@recipeEditor/SET_STEPS')<string[]>();

export const addIngredient = createAction('@recipeEditor/ADD_INGREDIENT')<
MeasuredIngredient
>();
export const removeIngredient = createAction('@recipeEditor/REMOVE_INGREDIENT')<
number
>();
export const swapIngredients = createAction('@recipeEditor/SWAP_INGREDIENTS')<
[number, number]
>();
export const setIngredients = createAction('@recipeEditor/SET_INGREDIENTS')<
MeasuredIngredient[]
>();

export const setRecipeId = createAction('@recipeEditor/SET_RECIPE_ID')<
number | null
>();
export const setImageData = createAction('@recipeEditor/SET_IMAGE_DATA')<
string | null
>();
export const setIntroduction = createAction('@recipeEditor/SET_INTRODUCTION')<
string
>();
export const setPreviewImage = createAction('@recipeEditor/SET_PREVIEW_IMAGE')<
string
>();
export const clearRecipe = createAction('@recipeEditor/CLEAR_RECIPE')();

// RecipeOverview actions
export const loadRecipeReleaseAsync = createAsyncAction(
  '@recipeEditor/LOAD_RECIPE_RELEASE_REQUEST',
  '@recipeEditor/LOAD_RECIPE_RELEASE_SUCCESS',
  '@recipeEditor/LOAD_RECIPE_RELEASE_FAILURE',
)<string | number, RecipeRelease, Error>();

export const updateRecipeReleaseAsync = createAsyncAction(
  '@recipeEditor/UPDATE_RECIPE_RELEASE_REQUEST',
  '@recipeEditor/UPDATE_RECIPE_RELEASE_SUCCESS',
  '@recipeEditor/UPDATE_RECIPE_RELEASE_FAILURE',
)<{ id: string | number, versionId: string | number }, RecipeRelease, Error>();

export const loadRecipeVersionsAsync = createAsyncAction(
  '@recipeEditor/LOAD_RECIPE_VERSIONS_REQUEST',
  '@recipeEditor/LOAD_RECIPE_VERSIONS_SUCCESS',
  '@recipeEditor/LOAD_RECIPE_VERSIONS_FAILURE',
)<string | number, recipe_version[], Error>();

