import { gql, request } from 'graphql-request';
import { PUBLIC_ROOT_URL } from '$env/static/public';

export interface RecentPost {
	id: string
	content: string
	creator: string
	createdAt: number
}

interface Data {
	recentPosts: RecentPost[]
}

export async function getRecentPosts(accessToken: string, before: number, count: number) {
	const query = gql`
      query RecentPosts($count: Int!, $before: Int) {
          recentPosts(count: $count, before: $before) {
              id
              content
              creator
              createdAt
          }
      }
	`

	const out = await request<Data>(
		`${PUBLIC_ROOT_URL}/graphql`,
		query,
		{ count: count, before: before },
		{ Authorization: `Bearer ${accessToken}`, }
	)

	return out.recentPosts;
}
