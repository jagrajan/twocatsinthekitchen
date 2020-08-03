import { RootEpic } from '@twocats/store';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import {
  deleteJWTAsync,
  loadJWTAsync,
  loginAsync,
  logoutAsync,
  saveJWTAsync,
  verifyJWTAsync
} from './actions';
import { updateSyncErrors } from 'redux-form';

export const deleteJWTEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(deleteJWTAsync.request)),
    switchMap(() => {
      localStorage.removeItem('JWT');
      return of(deleteJWTAsync.success());
    })
  );

export const loadJWTEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(loadJWTAsync.request)),
    switchMap(() => {
      const token = localStorage.getItem('JWT');
      if (token != null) {
        return of(loadJWTAsync.success(token), verifyJWTAsync.request(token));
      }
      return of(loadJWTAsync.failure());
    })
  );

export const loginEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loginAsync.request)),
    switchMap(action =>
      from(api.auth.login(action.payload)).pipe(
        mergeMap(x => {
          if ((x as any).errors) {
            return of(loginAsync.failure(), updateSyncErrors('login', (x as any).errors, 'Login failed.'));
          } else {
            return of(loginAsync.success(x.key), saveJWTAsync.request(x.jwt));
          }
        }),
        catchError(() => of(loginAsync.failure()))
      )
    )
  );

export const logoutEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(logoutAsync.request)),
    switchMap(() =>
      from(api.auth.logout()).pipe(
        mergeMap(loggedOut => {
          if (loggedOut) {
            return of(logoutAsync.success(), deleteJWTAsync.request())
          }
          return of(logoutAsync.failure());
        }),
        catchError(() => of(logoutAsync.failure()))
      )
    )
  );

export const saveJWTEpic: RootEpic = (action$, _, { axios }) =>
  action$.pipe(
    filter(isActionOf(saveJWTAsync.request)),
    switchMap(action => {
      localStorage.setItem('JWT', action.payload);
      axios.defaults.headers['Authorization'] = `Bearer ${action.payload}`;
      return of(saveJWTAsync.success());
    })
  );

export const verifyJWTEpic: RootEpic = (action$, _, { api, axios }) =>
  action$.pipe(
    filter(isActionOf(verifyJWTAsync.request)),
    switchMap((action) =>
      from(api.auth.loadKeyData(action.payload)).pipe(
        map(authKey => {
          if ('error' in authKey) {
            return deleteJWTAsync.request();
          } else {
            axios.defaults.headers['Authorization'] = `Bearer ${action.payload}`;
            return verifyJWTAsync.success(authKey)
          }
        }),
        catchError(() => of(verifyJWTAsync.failure()))
      )
    )
  );
