import { RootEpic } from '@twocats/store';
import { from, of } from 'rxjs';
import { filter, switchMap, catchError, mergeMap, map } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import {
  deleteJWTAsync,
  loadJWTAsync,
  loginAsync,
  logoutAsync,
  saveJWTAsync,
  verifyJWTAsync
} from './actions';

export const deleteJWTEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(deleteJWTAsync.request)),
    switchMap(() => {
      localStorage.removeItem('JWT');
      return of(deleteJWTAsync.success());
    })
  );

export const loadJWTEpic: RootEpic = (action$, _, { axios }) =>
  action$.pipe(
    filter(isActionOf(loadJWTAsync.request)),
    switchMap(() => {
      const token = localStorage.getItem('JWT');
      if (token != null) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
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
        mergeMap(x => of(loginAsync.success(x.key), saveJWTAsync.request(x.jwt))),
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

export const verifyJWTEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(verifyJWTAsync.request)),
    switchMap(() =>
      from(api.auth.loadKeyData()).pipe(
        map(authKey => verifyJWTAsync.success(authKey)),
        catchError(() => of(verifyJWTAsync.failure()))
      )
    )
  );
