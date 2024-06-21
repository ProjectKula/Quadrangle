import { getAllUsers } from '$lib/graphql/user/user.js';

export const load = async ({ cookies }) => {
    return {
        users: await getAllUsers(cookies.get('accessToken')!)
    };
};
