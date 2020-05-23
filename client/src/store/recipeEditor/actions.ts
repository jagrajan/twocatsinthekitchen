import { Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { RootState } from 'store';
import {
  RE_FETCH_DASHBOARD_RECIPES,
  RE_FETCH_DASHBOARD_RECIPES_SUCCESS,
  DashboardRecipes,
  RecipeEditorActionTypes
} from './types';

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
