import { confessionsPage } from "$lib/graphql/confessions";

export const load = async ({ cookies }) => {
  const token = cookies.get('accessToken');
  const confessions = await confessionsPage(token, 1 );
  return confessions;
};
