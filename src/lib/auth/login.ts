import { PUBLIC_ROOT_URL } from '$env/static/public';
import type { AuthResponse } from '$lib/auth/authresponse';

export async function loginWithCredentials(id: string, password: string) {
	const response = await fetch(`${PUBLIC_ROOT_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"id": id,
			"pw": password
		})
	});
	return response.json().then((data) => data as AuthResponse);
}
