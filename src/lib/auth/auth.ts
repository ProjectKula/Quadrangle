import cookie from 'cookie';
import { PUBLIC_ROOT_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp
}

export function setAuthCookies(resp: AuthResponse): boolean {
  const accessToken = resp.accessToken;
  const refreshToken = resp.refreshToken;
  const expiresAt = resp.expiresAt;

  if (!accessToken || !refreshToken || !expiresAt) {
    return false;
  }

  document.cookie = cookie.serialize('accessToken', accessToken, { path: '/', maxAge: 5184000 });
  document.cookie = cookie.serialize('refreshToken', refreshToken, { path: '/', maxAge: 5184000  });
  document.cookie = cookie.serialize('expiresAt', String(expiresAt), { path: '/', maxAge: 5184000  });
  return true;
}

export function isTokenExpired(): boolean {
  const expiresAtCookie = cookie.parse(document.cookie).expiresAt;
  const expiresAt = expiresAtCookie ? parseInt(expiresAtCookie, 10) : 0;
  return Date.now() >= (expiresAt - 12000);
}

export async function loginWithCredentials(id: string, password: string) {
  const response = await fetch(`${PUBLIC_ROOT_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': id,
      'pw': password
    })
  });
  return response.json().then((data) => data as AuthResponse);
}

export async function refreshIdentityToken(accessToken: string, refreshToken: string) {
  const response = await fetch(`${PUBLIC_ROOT_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      'refreshToken': refreshToken
    })
  });
  return response.json().then((data) => data as AuthResponse);
}
