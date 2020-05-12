import { Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { RootState } from 'store';
import {
  RECIPE_FETCH_RECENTS,
  RECIPE_SUCCESS_FETCH_RECENTS
} from './types';

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
