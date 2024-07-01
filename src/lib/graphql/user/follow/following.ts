import followQuery from './follow.graphql?raw';
import unfollowQuery from './unfollow.graphql?raw';
import { request } from 'graphql-request';
import { getRoot } from '$lib';
import followersQuery from './followers.graphql?raw';
import followingQuery from './following.graphql?raw';

interface FollowData {
  followUser: number;
}

interface UnfollowData {
  unfollowUser: number;
}

export interface PageMetadata {
    page: number;
    pageCount: number;
    per: number;
    total: number;
}

export interface FollowUser {
    id: number;
    name: string;
    avatarHash: string;
    isSelf: boolean;
}

export interface FollowPage {
    items: FollowUser[];
    metadata: PageMetadata;
}

interface FollowersData {
    user: { followers: FollowPage }
}

interface FollowingData {
    user: { following: FollowPage }
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

export async function getFollowers(id: number, per: number, page: number, accessToken: string): Promise<FollowPage> {
    const out = await request<FollowersData>(
        `${getRoot()}/graphql`,
        followersQuery,
        { userId: id, page: page, perPage: per },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.user.followers;
}

export async function getFollowing(id: number, per: number, page: number, accessToken: string): Promise<FollowPage> {
    const out = await request<FollowingData>(
        `${getRoot()}/graphql`,
        followingQuery,
        { userId: id, page: page, perPage: per },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.user.following;
}
