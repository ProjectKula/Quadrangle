import { getSelf } from '$lib/graphql/user/self';

export const load = async ({ cookies }) => {
  return await getSelf(cookies.get('accessToken')!);
}
