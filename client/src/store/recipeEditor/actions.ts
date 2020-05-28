import { Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { RootState } from 'store';
import {
  RE_FETCH_DASHBOARD_RECIPES,
  RE_FETCH_DASHBOARD_RECIPES_SUCCESS,
  RE_FETCH_ALL_INGREDIENTS,
  RE_FETCH_ALL_INGREDIENTS_SUCCESS,
  RE_FETCH_ALL_UNITS,
  RE_FETCH_ALL_UNITS_SUCCESS,
  RE_ADD_INGREDIENT,
  RE_REMOVE_INGREDIENT,
  RE_SWAP_INGREDIENTS,
  RE_ADD_STEP,
  RE_REMOVE_STEP,
  RE_SWAP_STEPS,
  RE_ADD_NOTE,
  RE_REMOVE_NOTE,
  RE_SWAP_NOTES,
  DashboardRecipes,
  Ingredient,
  Unit,
  RecipeIngredient,
  RecipeStep,
  RecipeNote,
  RecipeEditorActionTypes
} from './types';

export function addIngredient(ingredient: RecipeIngredient): RecipeEditorActionTypes {
  return {
    type: RE_ADD_INGREDIENT,
    payload: {
      ingredient,
    },
  };
}

export function removeIngredient(position: number): RecipeEditorActionTypes {
  return {
    type: RE_REMOVE_INGREDIENT,
    payload: {
      position,
    },
  };
}

export function swapIngredients(a: number, b: number): RecipeEditorActionTypes {
  return {
    type: RE_SWAP_INGREDIENTS,
    payload: {
      a,
      b,
    },
  };
}

export function addStep(step: RecipeStep): RecipeEditorActionTypes {
  return {
    type: RE_ADD_STEP,
    payload: {
      step,
    },
  };
}

export function removeStep(position: number): RecipeEditorActionTypes {
  return {
    type: RE_REMOVE_STEP,
    payload: {
      position,
    },
  };
}

export function swapSteps(a: number, b: number): RecipeEditorActionTypes {
  return {
    type: RE_SWAP_STEPS,
    payload: {
      a,
      b,
    },
  };
}

export function addNote(note: RecipeNote): RecipeEditorActionTypes {
  return {
    type: RE_ADD_NOTE,
    payload: {
      note,
    },
  };
}

export function removeNote(position: number): RecipeEditorActionTypes {
  return {
    type: RE_REMOVE_NOTE,
    payload: {
      position,
    },
  };
}

export function swapNotes(a: number, b: number): RecipeEditorActionTypes {
  return {
    type: RE_SWAP_NOTES,
    payload: {
      a,
      b,
    },
  };
}

export function startFetchDashboardRecipes(): RecipeEditorActionTypes {
  return {
    type: RE_FETCH_DASHBOARD_RECIPES
  };
}

export function successFetchDashboardRecipes(recipes: DashboardRecipes): RecipeEditorActionTypes {
  return {
    type: RE_FETCH_DASHBOARD_RECIPES_SUCCESS,
    payload: {
      recipes,
    }
  }
}

export function startFetchAllIngredients(): RecipeEditorActionTypes {
  return {
    type: RE_FETCH_ALL_INGREDIENTS
  };
}

export function successfetchAllIngredients(ingredients: Ingredient[]): RecipeEditorActionTypes {
  return {
    type: RE_FETCH_ALL_INGREDIENTS_SUCCESS,
    payload: {
      ingredients: ingredients
    }
  };
}

export function startFetchAllUnits(): RecipeEditorActionTypes {
  return {
    type: RE_FETCH_ALL_UNITS,
  };
}

export function successfetchAllUnits(units: Unit[]): RecipeEditorActionTypes {
  return {
    type: RE_FETCH_ALL_UNITS_SUCCESS,
    payload: {
      units
    }
  };
}

export const fetchDashboardRecipes = () => async(
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(startFetchDashboardRecipes());
  const res = await api.get('/recipe/dashboard');
  if (res.data.error) {
    console.error(res.data.error);
  } else {
    dispatch(successFetchDashboardRecipes(res.data.recipes));
  }
};

export const fetchAllIngredients = () => async (
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(startFetchAllIngredients());
  const res = await api.get('/ingredient');
  if (res.data.error) {
    console.error(res.data.error);
  } else {
    dispatch(successfetchAllIngredients(res.data.ingredients));
  }
};

export const fetchAllUnits = () => async (
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(startFetchAllUnits());
  const res = await api.get('/unit');
  if (res.data.error) {
    console.error(res.data.error);
  } else {
    dispatch(successfetchAllUnits(res.data.units));
  }
};
