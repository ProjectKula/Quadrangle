import { getSelf } from '$lib/graphql/self';

export const load = async ({ cookies }) => {
  return await getSelf(cookies.get('accessToken')!);
}
