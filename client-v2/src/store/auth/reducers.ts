import { combineReducers } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';
import { auth_key } from '@twocats/server/node_modules/.prisma/client';

import {
  loginAsync,
  logoutAsync,
  loadJWTAsync,
  saveJWTAsync,
  verifyJWTAsync
} from './actions';

const reducer = combineReducers({
  authKey: createReducer<auth_key | null, ActionType<
    typeof loginAsync
    | typeof verifyJWTAsync
    | typeof logoutAsync>>(null)
    .handleAction([loginAsync.success, verifyJWTAsync.success], (_, action) => action.payload)
    .handleAction(logoutAsync.success, () => null),
  isAxiosAuthSet: createReducer<boolean>(false)
    .handleAction([loadJWTAsync.success, saveJWTAsync.success], () => true),
});

export default reducer;
