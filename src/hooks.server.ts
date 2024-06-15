import cookie from 'cookie';
import { type AuthResponse, refreshIdentityToken } from '$lib/auth';
import { jwtDecode } from "jwt-decode";

const defaultCookieOpts = {
    httpOnly: false,
    maxAge: 5184000,
    path: '/'
};

export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/signup') || event.url.pathname.startsWith('/googleCallback')  || event.url.pathname.startsWith('/reset')) {
        return await resolve(event);
    }

    const cookies = cookie.parse(event.request.headers.get('Cookie') || '');
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
    const expiresAt = cookies.expiresAt;

    try {
        jwtDecode(accessToken);
    } catch (e) {
        return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
    }

    if (!accessToken || !refreshToken || !expiresAt) {
        console.log("Missing cookies (server)");
        return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
    }

    const expiresAtNum = parseInt(expiresAt, 10);

    if (Date.now() >= (expiresAtNum - 12000)) {
        console.log("Refreshing token (server)");
        let newAuth: AuthResponse;
        try {
            newAuth = await refreshIdentityToken(accessToken, refreshToken);
        } catch (e) {
            // TODO: handle this error
            console.log("Failed to refresh token");
            console.log(e);
            return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
        }

        const accessTokenCookie = cookie.serialize('accessToken', newAuth.accessToken, defaultCookieOpts);
        const refreshTokenCookie = cookie.serialize('refreshToken', newAuth.refreshToken, defaultCookieOpts);
        const expiresAtCookie = cookie.serialize('expiresAt', String(newAuth.expiresAt), defaultCookieOpts);

        event.request.headers.set('cookie', [
            accessTokenCookie,
            refreshTokenCookie,
            expiresAtCookie
        ].join('; '));

        const response = await resolve(event);
        response.headers.append('Set-Cookie', accessTokenCookie);
        response.headers.append('Set-Cookie', refreshTokenCookie);
        response.headers.append('Set-Cookie', expiresAtCookie);
        return response;
    }

    return await resolve(event);
}
