import { Dispatch } from 'redux';
import { startSubmit, stopSubmit } from 'redux-form';
import { AxiosInstance } from 'axios';
import { RootState } from 'store';
import {
  AUTH_DELETE_KEY,
  AUTH_STORE_KEY,
  AUTH_UPDATE_KEY_INFO,
  AUTH_UPDATE_USER_INFO,
  AUTH_VALIDATE_KEY,
  AuthActionTypes
} from './types';
import {
  addMessage
} from '../feedback/actions';

export const loginUser = (values: { [key: string]: string }) => async (
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(startSubmit('login'));
  try {
    const res = await api.post('/auth/login', values);
    console.log(res.data);
    if (res.data.errors) {
      dispatch(stopSubmit('login', res.data.errors));
    } else {
      dispatch(stopSubmit('login'));
      dispatch(addMessage({
        key: 'login',
        color: 'success',
        message: 'You are now logged in.'
      }));
      dispatch({
        type: AUTH_STORE_KEY,
        payload: {
          key: res.data.jwt
        }
      });
      api.defaults.headers['Authorization'] = `Bearer ${res.data.jwt}`;
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => async (
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  api.defaults.headers['Authorization'] = undefined;
  dispatch({
    type: AUTH_DELETE_KEY
  });
};

export const validateKey = () => async (
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  const key = getState().auth.key;
  if (key && key !== undefined) {
    dispatch({ type: AUTH_VALIDATE_KEY });
    api.defaults.headers['Authorization'] = `Bearer ${key}`;
    const res = await api.get('/auth/info');
    if (res.data.error) {
      dispatch({
        type: AUTH_DELETE_KEY
      });
    } else {
      dispatch({
        type: AUTH_UPDATE_KEY_INFO,
        payload: {
          key: res.data.key,
        },
      });
    }
  }
};
