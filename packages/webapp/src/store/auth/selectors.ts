import { createSelector } from 'reselect';
import { RootState } from '@twocats/store';

const authSelector = (state: RootState) => state.auth;

export const getAuthKey = createSelector(
  authSelector,
  state => state.authKey
);

export const getIsAdmin = createSelector(
  getAuthKey,
  key => key ? key.admin : false
);
