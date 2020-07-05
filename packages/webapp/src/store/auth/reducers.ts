import { auth_key } from '@prisma/client';
import { combineReducers } from 'redux';
import { ActionType, createReducer } from 'typesafe-actions';

import { loadJWTAsync, loginAsync, logoutAsync, saveJWTAsync, verifyJWTAsync } from './actions';

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
