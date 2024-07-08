import { search } from '$lib/graphql/search/index.js';

export const load = async ({ params, url, cookies }) => {
    const accessToken = cookies.get('accessToken')!;
    const data = await search(params.slug, accessToken);
    return { query: params.slug, data };
};
