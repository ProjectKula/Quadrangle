import { redirect } from '@sveltejs/kit';
import { getRoot } from '$lib';

export const load = async ({ url }) => {
    const nonce = url.searchParams.get('nonce');

    if (!nonce) {
        redirect(307, '/login');
    }
    
    const response = await fetch(`${getRoot()}/v0/auth/password/reset/verify?nonce=${nonce}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const body = await response.json() as { nonce: string }
    console.log(body);
    const newNonce = body.nonce;
    
    if (!newNonce) {
        redirect(307, '/login');
    }
    
    return {
        nonce: newNonce
    }
};
