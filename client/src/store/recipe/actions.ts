import { createAction, createAsyncAction } from 'typesafe-actions';
import { RecipeDetails } from '@twocats/server/src/types/responses';
import { recipe_note, recipe_version } from '@twocats/server/node_modules/.prisma/client';

export const loadRecentRecipesAsync = createAsyncAction(
  '@recipe/LOAD_RECENT_RECIPES_REQUEST',
  '@recipe/LOAD_RECENT_RECIPES_SUCCESS',
  '@recipe/LOAD_RECENT_RECIPES_FAILURE',
)<undefined, recipe_version[], undefined>();

export const loadRecipeDetailsAsync = createAsyncAction(
  '@recipe/LOAD_RECIPE_DETAILS_REQUEST',
  '@recipe/LOAD_RECIPE_DETAILS_SUCCESS',
  '@recipe/LOAD_RECIPE_DETAILS_FAILURE',
)<string | number, RecipeDetails, Error>();

export const loadNotesAsync = createAsyncAction(
  '@recipe/LOAD_MY_NOTES_REQUEST',
  '@recipe/LOAD_MY_NOTES_SUCCESS',
  '@recipe/LOAD_MY_NOTES_FAILURE',
)<string | number, recipe_note[], Error>();

export const updateNotesAsync = createAsyncAction(
  '@recipe/UPDATE_MY_NOTES_REQUEST',
  '@recipe/UPDATE_MY_NOTES_SUCCESS',
  '@recipe/UPDATE_MY_NOTES_FAILURE',
)<{ id: string | number, notes: string[] }, recipe_note[], Error>();

export const setRecipeScale = createAction('@recipe/SET_RECIPE_SCALE')<number>();

export const addNote = createAction('@recipe/ADD_NOTE')<string>();
export const removeNote = createAction('@recipe/REMOVE_NOTE')<number>();
export const setNotes = createAction('@recipe/SET_NOTES')<string[]>();
export const swapNotes = createAction('@recipe/SWAP_NOTES')<{ a: number, b: number }>();
export const updateNote = createAction('@recipe/UPDATE_NOTE')<{ index: number, note: string }>();
