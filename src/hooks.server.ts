import cookie from 'cookie';

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

	return await resolve(event);
}
