import cookie from 'cookie';
import { getRoot } from '$lib/index';

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
    document.cookie = cookie.serialize('refreshToken', refreshToken, { path: '/', maxAge: 5184000 });
    document.cookie = cookie.serialize('expiresAt', String(expiresAt), { path: '/', maxAge: 5184000 });
    return true;
}

export function getAuthTokenClient(): string {
    return cookie.parse(document.cookie).accessToken;
}

export function isTokenExpired(): boolean {
    const expiresAtCookie = cookie.parse(document.cookie).expiresAt;
    const expiresAt = expiresAtCookie ? parseInt(expiresAtCookie, 10) : 0;
    return Date.now() >= (expiresAt - 12000);
}

export async function loginWithCredentials(id: string, password: string) {
    // if the id is an email, we should use the email login endpoint
    // if the id is a username, we should use the username login endpoint
    // this is a simple check for now
    const email = id.includes('@');
    const endpoint = `${getRoot()}/v0/auth/login/${email ? 'email' : 'id'}`;
    const body = email ? { email: id, password: password } : { collegeId: id, password: password };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return response.json().then((data) => data as AuthResponse);
}

export async function refreshIdentityToken(accessToken: string, refreshToken: string) {
    const response = await fetch(`${getRoot()}/v0/auth/refresh`, {
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
