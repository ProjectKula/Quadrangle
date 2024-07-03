import query from './user.graphql?raw';
import editProfileQuery from './edit.graphql?raw';
import allUsersQuery from './allusers.graphql?raw';
import { request } from 'graphql-request';
import { getRoot } from '$lib';
import type { RecentPost } from '$lib/graphql/post/recentPosts';

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
    badges: { type: string }[];
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

interface AllUsersData {
    users: User[]
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

export async function getAllUsers(accessToken: string) {
    const out = await request<AllUsersData>(
        `${getRoot()}/graphql`,
        allUsersQuery,
        {},
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.users;
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
    let formData = new FormData();
    formData.append('avatar', avatar);

    return fetch(`${getRoot()}/v0/avatar`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: await avatar.arrayBuffer()
    });
}

export async function deleteAvatar(accessToken: string) {
    return fetch(`${getRoot()}/v0/avatar`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
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
