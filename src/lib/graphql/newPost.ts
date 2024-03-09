import { request } from 'graphql-request';
import { getRootUrl } from '$lib/index';
import query from './newPost.graphql?raw';

export interface NewPost {
    id: string;
    createdAt: number;
}

interface Data {
    createPost: NewPost;
}

export async function createNewPost(accessToken: string, content: string) {
    const out = await request<Data>(
        `${getRootUrl()}/graphql`,
        query,
        { content: content },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.createPost;
}
