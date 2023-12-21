// @ts-expect-error it does exist
import { PUBLIC_ROOT_URL } from '$env/static/public';
import type { AuthResponse } from '$lib/auth/authresponse';

export interface SignupStateResponse {
	success: boolean;
	state: string;
}

export async function requestEmailCode(id: string, email: string) {
	const response = await fetch(`${PUBLIC_ROOT_URL}/auth/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"id": id,
			"email": email
		})
	});
	// Return a SignupStateResponse
	return response.json().then((data) => data as SignupStateResponse);
}

export async function sendEmailCode(token: string, code: string) {
	const response = await fetch(`${PUBLIC_ROOT_URL}/auth/signup/code`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"code": code
		})
	});
	return response.json().then((data) => data as SignupStateResponse);
}

export async function setInitialCredentials(token: string, password: string) {
	const response = await fetch(`${PUBLIC_ROOT_URL}/auth/signup/cred`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"password": password
		})
	});
	return response.json().then((data) => data as AuthResponse);
}
