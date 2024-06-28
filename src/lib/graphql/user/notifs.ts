import request from 'graphql-request';
import query from './notifs.graphql?raw';
import { getRoot } from '$lib';

interface ReferencePost {
    id: string
}

interface ReferenceUser {
    id: number
    name: string
    avatarHash: string
}

export interface Notification {
    id: string
    createdAt: number // seconds since epoch
    type: 'follow' | 'like' | 'comment' | 'mention'
    referencePost: ReferencePost
    referenceUser: ReferenceUser
}

interface Data {
    notifications: Notification[]
}

export async function getNotifs(accessToken: string) {
    const out = await request<Data>(
        `${getRoot()}/graphql`,
        query,
        {},
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.notifications;
}
