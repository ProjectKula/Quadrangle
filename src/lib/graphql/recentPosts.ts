import { gql, request } from 'graphql-request';
import { getRootUrl } from '$lib/index';

export interface RecentPost {
	id: string
	content: string
	createdAt: number
}

interface Data {
	recentPosts: RecentPost[]
}

export async function getRecentPostsNow(accessToken: string, count: number) {
	return await getRecentPosts(accessToken, Date.now() / 1000, count);
}

export async function getRecentPosts(accessToken: string, before: number, count: number) {
	const query = gql`
      query RecentPosts($count: Int!, $before: Int) {
          recentPosts(count: $count, before: $before) {
              id
              content
              createdAt
          }
      }
	`

	const out = await request<Data>(
		`${getRootUrl()}/graphql`,
		query,
		{ count: count, before: before },
		{ Authorization: `Bearer ${accessToken}`, }
	)

	return out.recentPosts;
}
