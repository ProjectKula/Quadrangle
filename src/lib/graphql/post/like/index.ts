import { request } from 'graphql-request';
import { getRoot } from '$lib';
import likeQuery from './likePost.graphql?raw';
import unlikeQuery from './unlikePost.graphql?raw';
import likesPageQuery from './likesPage.graphql?raw';

export interface PageMetadata {
    page: number;
    pageCount: number;
    per: number;
    total: number;
}

export interface LikeUser {
    id: number;
    name: string;
    avatarHash: string;
    isSelf: boolean;
}

export interface LikePage {
    items: LikeUser[];
    metadata: PageMetadata;
}

export interface Data2 {
    post: {likes: LikePage};
}

interface Data1 {
    likePost: number;
}

interface Data0 {
    unlikePost: number;
}

export async function getLikesPage(id: string, per: number, page: number, accessToken: string): Promise<LikePage> {
    const out = await request<Data2>(
        `${getRoot()}/graphql`,
        likesPageQuery,
        { postId: id, page: page, perPage: per },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.post.likes;
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
