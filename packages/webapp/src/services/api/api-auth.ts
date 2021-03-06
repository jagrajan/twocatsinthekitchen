import { auth_key } from '@prisma/client';
import axios from '../axios';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginErrorResponse = {
  errors: { [key: string]: string };
};

export async function login(payload: LoginPayload): Promise<{ key: auth_key, jwt: string}> {
  const res = await axios.post<{ key: auth_key, jwt: string}>('/auth/login', payload);
  return res.data;
}

export async function logout(): Promise<boolean> {
  const res = await axios.get<{ logout: boolean}>('/auth/logout');
  return res.data.logout;
}

export async function loadKeyData(token: string): Promise<auth_key | { error: string }> {
  const res = await axios.get<auth_key | { error: string}>('/auth/info', { params: { token }});
  return res.data;
}
