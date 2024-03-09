import { error } from '@sveltejs/kit';
import { getUser } from '$lib/graphql/user/user';

export const load = async ({ params, cookies }) => {
    const numberSlug = parseInt(params.slug);

    if (!numberSlug) {
        error(404, 'Not found');
    }

    return await getUser(numberSlug, cookies.get('accessToken')!);
};
