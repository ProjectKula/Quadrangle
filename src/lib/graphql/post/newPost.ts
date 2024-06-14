import { request } from 'graphql-request';
import { getRoot } from '$lib';
import query from './newPost.graphql?raw';

export interface NewPost {
    id: string;
    createdAt: number;
}

interface Data {
    createPost: NewPost;
}

export async function createNewPost(accessToken: string, content: string, attachments: string[]) {
    const out = await request<Data>(
        `${getRoot()}/graphql`,
        query,
        { content: content, attachments: attachments },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.createPost;
}
