import { Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { RootState } from 'store';
import {
  RECIPE_FETCH_RECENTS,
  RECIPE_SUCCESS_FETCH_RECENTS,
  RECIPE_FETCH_DETAILS,
  RECIPE_SUCCESS_FETCH_DETAILS
} from './types';
import {
  addMessage
} from '../feedback/actions';

export const fetchRecentRecipes = () => async (
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch({
    type: RECIPE_FETCH_RECENTS
  });
  const res = await api.get('/recipe/recent');
  dispatch({
    type: RECIPE_SUCCESS_FETCH_RECENTS,
    payload: {
      ...res.data
    }
  });
};

export const fetchRecipeDetails = (id: string | number) => async (
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch({
    type: RECIPE_FETCH_DETAILS
  });
  const res = await api.get(`/recipe/${id}`);
  if (res.data.error) {
    dispatch(addMessage({
      key: 'login',
      color: 'error',
      message: res.data.error
    }));
  } else {
    dispatch({
      type: RECIPE_SUCCESS_FETCH_DETAILS,
      payload: {
        ...res.data
      }
    });
  }
};

