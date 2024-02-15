import { request } from 'graphql-request';
import { getRootUrl } from '$lib/index';
import recentPostsQuery from './recentPosts.graphql?raw';

export interface RecentPost {
	id: string
	content: string
	createdAt: number
	likesCount: number
}

interface Data {
	recentPosts: RecentPost[]
}

export async function getRecentPostsNow(accessToken: string, count: number) {
	return await getRecentPosts(accessToken, Date.now() / 1000, count);
}

export async function getRecentPosts(accessToken: string, before: number, count: number) {
	const out = await request<Data>(
		`${getRootUrl()}/graphql`,
		recentPostsQuery,
		{ count: count, before: before },
		{ Authorization: `Bearer ${accessToken}`, }
	)

	return out.recentPosts;
}
