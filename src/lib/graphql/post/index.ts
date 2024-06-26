import { request } from 'graphql-request';
import { getRoot } from '$lib';
import postQuery from './post.graphql?raw';

export interface Post {
    id: string;
    content: string;
    createdAt: number;
    likesCount: number;
    creator: {
        id: number;
        name: number;
    };
    selfLiked: boolean;
    attachments: string[];
}

interface Data {
    post: Post;
}

export async function getPost(id: string, accessToken: string): Promise<Post> {
    const out = await request<Data>(
        `${getRoot()}/graphql`,
        postQuery,
        { id },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.post;
}
