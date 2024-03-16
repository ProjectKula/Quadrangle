import { redirect } from '@sveltejs/kit';
import { getRoot } from '$lib';
import type { AuthResponse } from '$lib/auth/auth';

const defaultCookieOpts = {
    httpOnly: false,
    maxAge: 5184000,
    path: '/'
};

export async function POST({ request, cookies }) {
    const credential = (await request.formData()).get('credential') as string;

    const newAuth = await fetch(`${getRoot()}/v0/auth/google`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${credential}`
            }
        }
    )
        .then((response) => response.json())
        .then((data) => data as AuthResponse);

    cookies.set('accessToken', newAuth.accessToken, defaultCookieOpts);
    cookies.set('refreshToken', newAuth.refreshToken, defaultCookieOpts);
    cookies.set('expiresAt', String(newAuth.expiresAt), defaultCookieOpts);

    throw redirect(302, '/');
}
