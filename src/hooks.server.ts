import cookie from 'cookie';
import { type AuthResponse, refreshIdentityToken } from '$lib/auth/auth';

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/signup')) {
		return await resolve(event);
	}

	const cookies = cookie.parse(event.request.headers.get('Cookie') || '');
	const accessToken = cookies.accessToken;
	const refreshToken = cookies.refreshToken;
	const expiresAt = cookies.expiresAt;

	if (!accessToken || !refreshToken || !expiresAt) {
		return new Response('Redirect', {status: 303, headers: { Location: '/login' }});
	}

	const expiresAtNum = parseInt(expiresAt, 10);

	if (Date.now() < (expiresAtNum - 12000)) {
		let newAuth: AuthResponse
		try {
			newAuth = await refreshIdentityToken(accessToken, refreshToken)
		} catch (e) {
			// TODO: handle this error
			return new Response('Redirect', {status: 303, headers: { Location: '/login' }});
		}

		event.request.headers.set('cookie', [
			`accessToken=${newAuth.accessToken}; Path=/; Max-Age=5184000`,
			`refreshToken=${newAuth.refreshToken}; Path=/; Max-Age=5184000`,
			`expiresAt=${newAuth.expiresAt}; Path=/; Max-Age=5184000`,
		].join('; '));

		const response = await resolve(event);
		response.headers.append('Set-Cookie', [
			`accessToken=${newAuth.accessToken}; Path=/; Max-Age=5184000`,
			`refreshToken=${newAuth.refreshToken}; Path=/; Max-Age=5184000`,
			`expiresAt=${newAuth.expiresAt}; Path=/; Max-Age=5184000`,
		].join('; '))
		return response
	}

	return await resolve(event);
}
