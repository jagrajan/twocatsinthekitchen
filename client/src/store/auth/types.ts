import { AuthKeyDefinition } from '../../../../server/src/models/auth/AuthKey';
import { UserDefinition } from '../../../../server/src/models/users/User';
export const AUTH_STORE_KEY = 'AUTH_STORE_KEY';
export const AUTH_DELETE_KEY = 'AUTH_DELETE_KEY';
export const AUTH_VALIDATE_KEY = 'AUTH_VALIDATE_KEY';
export const AUTH_UPDATE_KEY_INFO = 'AUTH_UPDATE_KEY_INFO';
export const AUTH_FETCH_USER_INFO = 'AUTH_FETCH_USER_INFO';
export const AUTH_UPDATE_USER_INFO = 'AUTH_UPDATE_USER_INFO';

export type AuthKey = AuthKeyDefinition;
export type User = UserDefinition;

export type AuthStoreKeyAction = {
  type: typeof AUTH_STORE_KEY,
  payload: {
    key: string
  }
};

export type AuthDeleteKeyAction = {
  type: typeof AUTH_DELETE_KEY
};

export type AuthValidateKey = {
  type: typeof AUTH_VALIDATE_KEY;
  key: string;
};

export type AuthUpdateKeyInfo = {
  type: typeof AUTH_UPDATE_KEY_INFO;
  payload: {
    key: AuthKey;
  };
};

export type AuthFetchUserInfo = {
  type: typeof AUTH_FETCH_USER_INFO;
};

export type AuthUpdateUserInfo = {
  type: typeof AUTH_UPDATE_USER_INFO;
  payload: {
    user: User;
  };
};

export type AuthActionTypes =
  AuthDeleteKeyAction
  | AuthStoreKeyAction
  | AuthValidateKey
  | AuthUpdateKeyInfo
  | AuthFetchUserInfo
  | AuthUpdateUserInfo;

export interface AuthState {
  key?: string;
  info?: AuthKey;
  profile?: User;
}
