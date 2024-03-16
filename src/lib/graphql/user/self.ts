import query from './self.graphql?raw';
import { request } from 'graphql-request';
import { getRoot } from '$lib';
import type { User } from '$lib/graphql/user/user';

interface Data {
  self: User;
}

export async function getSelf(accessToken: string) {
  const out = await request<Data>(
    `${getRoot()}/graphql`,
    query,
    {},
    { Authorization: `Bearer ${accessToken}` }
  );

  return out.self;
}
