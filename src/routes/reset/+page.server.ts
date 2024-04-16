import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
    const nonce = url.searchParams.get('nonce');

    if (!nonce) {
        redirect(307, '/login');
    }

    return {
        nonce: nonce
    }
};
