import query from './self.graphql?raw'
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
}

interface Data {
	self: User
}

export async function getSelf(accessToken: string) {
	const out = await request<Data>(
		`${getRootUrl()}/graphql`,
		query,
		{},
		{ Authorization: `Bearer ${accessToken}`, }
	)

	return out.self
}
