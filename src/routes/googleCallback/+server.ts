import { json, redirect } from '@sveltejs/kit';
import { getRootUrl } from '$lib';
import type { AuthResponse } from '$lib/auth/auth';

export async function POST({ request, cookies }) {
	const e = await request.formData()
	const credential = e.get('credential') as string;

	const resp = await fetch(`${getRootUrl()}/v0/auth/google`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${credential}`,
		}, }
	)
		.then((response) => response.json())
		.then((re) => {
			console.log(re);
			return re
		})
	console.log(resp);

	if (1==1) {
		return json(resp);
	}

	const newAuth: AuthResponse = {
		accessToken: resp.accessToken,
		refreshToken: resp.refreshToken,
		expiresAt: resp.expiresAt,
	}

	cookies.set('accessToken', newAuth.accessToken, {
		httpOnly: false,
		maxAge: 5184000,
		path: '/'
	})
	cookies.set('refreshToken', newAuth.refreshToken, {
		httpOnly: false,
		maxAge: 5184000,
		path: '/'
	})
	cookies.set('expiresAt', String(newAuth.expiresAt), {
		httpOnly: false,
		maxAge: 5184000,
		path: '/'
	})

	throw redirect(302, '/')
}
