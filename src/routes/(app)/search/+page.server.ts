import { search } from '$lib/graphql/search/index.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, url, cookies }) => {
    const query = url.searchParams.get('q');
    if (!query) {
        redirect(303, '/')
    }
    const accessToken = cookies.get('accessToken')!;
    const data = await search(query, accessToken);
    return { query, data };
};
