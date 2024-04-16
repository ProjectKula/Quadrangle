import { redirect } from '@sveltejs/kit';
import { getRoot } from '$lib';

export const load = async ({ url }) => {
    const nonce = url.searchParams.get('nonce')

    if (!nonce) {
        redirect(307, '/login');
    }
    
    console.log("nonce:")
    console.log(nonce);
    
    const response = await fetch(`${getRoot()}/v0/auth/password/reset/verify?nonce=${nonce}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const body = await response.json() as { nonce: string, error?: boolean }
    console.log("body:")
    console.log(body);
    const newNonce = body.nonce;
    console.log("newNonce:");
    console.log(newNonce);
    
    if (body.error || !newNonce) {
        redirect(307, '/login');
    }
    
    return {
        nonce: newNonce
    }
};
