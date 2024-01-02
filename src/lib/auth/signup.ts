import { PUBLIC_ROOT_URL } from '$env/static/public';
import type { AuthResponse } from '$lib/auth/auth';

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
	const body = await response.json()
	if (response.status != 200) {
		throw new Error(`Could not request email code ${body}`);
	}
	return body as SignupStateResponse;
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
	const body = await response.json()
	if (response.status != 200) {
		throw new Error(`Could not send email code ${body}`);
	}
	return body as SignupStateResponse;
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
	const body = await response.json()
	if (response.status != 200) {
		throw new Error(`Could not set initial credentials ${body}`);
	}
	return body as AuthResponse;
}
