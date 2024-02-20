import query from './user.graphql?raw'
import { request } from 'graphql-request';
import { getRootUrl } from '$lib';

export interface User {
	id: number
	name: string
	dateRegistered: number
	gender: string
	pronouns: string
	bio: string // one-liner
	branch: string // e.g. CS, EC, EE, ME, CE, CH, AS
	isSelf: boolean
	followerCount: number
	followingCount: number
	followedBySelf: boolean
}

interface Data {
	user: User
}

export async function getUser(id: number, accessToken: string) {
	const out = await request<Data>(
		`${getRootUrl()}/graphql`,
		query,
		{ id: id },
		{ Authorization: `Bearer ${accessToken}`, }
	)

	return out.user
}
