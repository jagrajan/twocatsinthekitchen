export const AUTH_STORE_KEY = 'AUTH_STORE_KEY';
export const AUTH_DELETE_KEY = 'AUTH_DELETE_KEY';

export type AuthStoreKeyAction = {
  type: typeof AUTH_STORE_KEY,
  payload: {
    key: string
  }
};

export type AuthDeleteKeyAction = {
  type: typeof AUTH_DELETE_KEY
};

export type AuthActionTypes =
  AuthDeleteKeyAction
  | AuthStoreKeyAction;

export interface AuthState {
  key?: string;
}
