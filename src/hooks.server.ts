import cookie from 'cookie';
import { type AuthResponse, refreshIdentityToken } from '$lib/auth/auth';

const defaultCookieOpts = {
    httpOnly: false,
    maxAge: 5184000,
    path: '/'
};

export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/signup') || event.url.pathname.startsWith('/googleCallback')) {
        return await resolve(event);
    }

    const cookies = cookie.parse(event.request.headers.get('Cookie') || '');
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
    const expiresAt = cookies.expiresAt;

    if (!accessToken || !refreshToken || !expiresAt) {
        return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
    }

    const expiresAtNum = parseInt(expiresAt, 10);

    if (Date.now() >= (expiresAtNum - 12000)) {
        let newAuth: AuthResponse;
        try {
            newAuth = await refreshIdentityToken(accessToken, refreshToken);
        } catch (e) {
            // TODO: handle this error
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
