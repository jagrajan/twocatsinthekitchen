import { createAsyncAction } from 'typesafe-actions';
import { auth_key } from '@prisma/client';
import { LoginPayload } from 'services/api/api-auth';

export const loginAsync = createAsyncAction(
  '@auth/LOGIN_REQUEST',
  '@auth/LOGIN_SUCCESS',
  '@auth/LOGIN_FAILURE'
)<LoginPayload, auth_key, undefined>();

export const logoutAsync = createAsyncAction(
  '@auth/LOGOUT_REQUEST',
  '@auth/LOGOUT_SUCCESS',
  '@auth/LOGOUT_FAILURE'
)<undefined, undefined, undefined>();

export const saveJWTAsync = createAsyncAction(
  '@auth/SAVE_JWT_REQUEST',
  '@auth/SAVE_JWT_SUCCESS',
  '@auth/SAVE_JWT_FAILURE'
)<string, undefined, undefined>();

export const loadJWTAsync = createAsyncAction(
  '@auth/LOAD_JWT_REQUEST',
  '@auth/LOAD_JWT_SUCCESS',
  '@auth/LOAD_JWT_FAILURE'
)<undefined, string, undefined>();

export const deleteJWTAsync = createAsyncAction(
  '@auth/DELETE_JWT_REQUEST',
  '@auth/DELETE_JWT_SUCCESS',
  '@auth/DELETE_JWT_FAILURE'
)<undefined, undefined, undefined>();

export const verifyJWTAsync = createAsyncAction(
  '@auth/VERIFY_JWT_REQUEST',
  '@auth/VERIFY_JWT_SUCCESS',
  '@auth/VERIFY_JWT_FAILURE'
)<string, auth_key, undefined>();
