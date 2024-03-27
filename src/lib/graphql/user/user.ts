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
    avatarHash: string | null;
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

export async function uploadAvatar(avatar: File, accessToken: string) {

    let file = await avatar.arrayBuffer().then((buffer) => {
        return new Uint8Array(buffer);
    });

    return fetch(`${getRoot()}/v0/avatar`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: file
    });
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
