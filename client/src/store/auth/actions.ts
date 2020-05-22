import { Dispatch } from 'redux';
import { startSubmit, stopSubmit } from 'redux-form';
import { AxiosInstance } from 'axios';
import { RootState } from 'store';
import {
  AuthKey,
  User,
  AUTH_DELETE_KEY,
  AUTH_STORE_KEY,
  AUTH_UPDATE_KEY_INFO,
  AUTH_FETCH_USER_INFO,
  AUTH_UPDATE_USER_INFO,
  AUTH_VALIDATE_KEY,
  AuthActionTypes
} from './types';
import {
  addMessage
} from '../feedback/actions';

export function setKey(key: string): AuthActionTypes {
  return {
    type: AUTH_STORE_KEY,
    payload: {
      key,
    },
  }
}

export function deleteKey(): AuthActionTypes {
  return {
    type: AUTH_DELETE_KEY,
  }
}

export function updateUserInfo(user: User): AuthActionTypes {
  return {
    type: AUTH_UPDATE_USER_INFO,
    payload: {
      user,
    },
  }
}

export function updateKeyInfo(key: AuthKey): AuthActionTypes {
  return {
    type: AUTH_UPDATE_KEY_INFO,
    payload: {
      key,
    },
  }
}

async function fetchAndUpdateUserInfo(userId: string, api: AxiosInstance, dispatch: Dispatch): Promise<void> {
  const res = await api.get(`/user/${userId}`);
  if (res.data.error) {
    // TODO something
  } else {
    dispatch(updateUserInfo(res.data.user));
  }
}

export const loginUser = (values: { [key: string]: string }) => async (
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(startSubmit('login'));
  try {
    const res = await api.post('/auth/login', values);
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
  dispatch(deleteKey());
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
      dispatch(deleteKey());
    } else {
      dispatch(updateKeyInfo(res.data.key))
    }
  }
};

export const fetchProfile = () => async(
  dispatch: Dispatch,
  getState: () => RootState,
  api: AxiosInstance
) => {
  const state = getState().auth;
  if (state.info) {
    dispatch({ type: AUTH_FETCH_USER_INFO });
    await fetchAndUpdateUserInfo(state.info.user_id, api, dispatch);
  }
};
