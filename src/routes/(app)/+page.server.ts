import { getRecentPostsNow } from "$lib/graphql/recentPosts";

export const load = async ({ params, cookies }) => {
    const accessToken = cookies.get('accessToken');
    const data = await getRecentPostsNow(accessToken, 10);
    console.log(data);
    return {
        data: data
    };
};
