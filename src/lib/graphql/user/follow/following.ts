import followQuery from './follow.graphql?raw';
import unfollowQuery from './unfollow.graphql?raw';
import { request } from 'graphql-request';
import { getRoot } from '$lib';

interface FollowData {
  followUser: number;
}

interface UnfollowData {
  unfollowUser: number;
}

export async function follow(id: number, accessToken: string): Promise<number> {
  const out = await request<FollowData>(
    `${getRoot()}/graphql`,
    followQuery,
    { id: id },
    { Authorization: `Bearer ${accessToken}` }
  );

  return out.followUser;
}

export async function unfollow(id: number, accessToken: string): Promise<number> {
  const out = await request<UnfollowData>(
    `${getRoot()}/graphql`,
    unfollowQuery,
    { id: id },
    { Authorization: `Bearer ${accessToken}` }
  );

  return out.unfollowUser;
}
