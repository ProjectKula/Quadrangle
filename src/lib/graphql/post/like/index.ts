import { request } from 'graphql-request';
import { getRoot } from '$lib';
import likeQuery from './likePost.graphql?raw';
import unlikeQuery from './unlikePost.graphql?raw';

interface Data1 {
    likePost: number;
}

interface Data0 {
    unlikePost: number;
}

export async function likePost(id: string, accessToken: string): Promise<number> {
    const out = await request<Data1>(
        `${getRoot()}/graphql`,
        likeQuery,
        { id: id },
        { Authorization: `Bearer ${accessToken}` }
    );
    
    return out.likePost;
}

export async function unlikePost(id: string, accessToken: string): Promise<number> {
    const out = await request<Data0>(
        `${getRoot()}/graphql`,
        unlikeQuery,
        { id: id },
        { Authorization: `Bearer ${accessToken}` }
    );
    
    return out.unlikePost;
}
