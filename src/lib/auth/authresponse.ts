import cookie from 'cookie';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp
}

export function setAuthCookies(resp: AuthResponse) {
  const accessToken = resp.accessToken;
  const refreshToken = resp.refreshToken;
  const expiresAt = resp.expiresAt;

  document.cookie = cookie.serialize('accessToken', accessToken, { path: '/' });
  document.cookie = cookie.serialize('refreshToken', refreshToken, { path: '/' });
  document.cookie = cookie.serialize('expiresAt', String(expiresAt), { path: '/' });
}

export function isTokenExpired(): boolean {
  const expiresAtCookie = cookie.parse(document.cookie).expiresAt;
  const expiresAt = expiresAtCookie ? parseInt(expiresAtCookie, 10) : 0;
  return Date.now() >= (expiresAt - 12000);
}
