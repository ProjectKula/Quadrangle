import query from './user.graphql?raw';
import editProfileQuery from './edit.graphql?raw';
import { request } from 'graphql-request';
import { getRoot } from '$lib';
import type { RecentPost } from '$lib/graphql/recentPosts';

export interface User {
    id: number;
    name: string;
    dateRegistered: number;
    gender: string;
    pronouns: string;
    bio: string; // one-liner
    branch: string; // e.g. CS, EC, EE, ME, CE, CH, AS
    isSelf: boolean;
    followerCount: number;
    followingCount: number;
    followedBySelf: boolean;
    posts: PostPage;
}

export interface PostPage {
    items: [RecentPost];
    metadata: Metadata;
}

export interface Metadata {
    pageCount: number;
}

interface Data {
    user: User;
}

export async function getUser(id: number, accessToken: string) {
    const out = await request<Data>(
        `${getRoot()}/graphql`,
        query,
        { id: id },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.user;
}

export function editProfile(bio: string, pronouns: string, accessToken: string) {
    return request<{id: string}>(
        `${getRoot()}/graphql`,
        editProfileQuery,
        { bio: checkEmptyString(bio), pronouns: checkEmptyString(pronouns) },
        { Authorization: `Bearer ${accessToken}` }
    )
}

function checkEmptyString(input: string | null): string | null {
    if (!input) {
        return null;
    }
    if (input.trim() === '') {
    return null;
    } else {
        return input;
    }
}
