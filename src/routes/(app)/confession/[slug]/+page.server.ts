import { error } from '@sveltejs/kit';
import { getConfession } from '$lib/graphql/confessions/confessions'

export const load = async ({ params, cookies }) => {
    const numberSlug = parseInt(params.slug);

    if (!numberSlug) {
        error(404, 'Not found');
    }

    try {
        return await getConfession(numberSlug, cookies.get('accessToken')!)
    } catch (e) {
        return { id: numberSlug };
    }
};
