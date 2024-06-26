import { getPost } from '$lib/graphql/post';

export const load = async ({ params, cookies }) => {
    const postSlug = params.slug;
    const accessToken = cookies.get('accessToken')!;
    const data = await getPost(postSlug, accessToken);
    return data;
};
