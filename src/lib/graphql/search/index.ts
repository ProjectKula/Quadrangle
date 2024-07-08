import { getRoot } from '$lib';
import request from 'graphql-request';
import query from './search.graphql?raw';

interface Data {
    search: [SearchResult]
}

export interface SearchResult {
    __typename: string;
    createdAt: number;
}

export interface SearchedUser {
    __typename: string;
    createdAt: number;
    id: number
    name: string
    avatarHash: string
}

export interface SearchedPost {
    __typename: string;
    createdAt: number;
    content: string;
    id: string;
    creator: {
        id: number;
        name: string;
        avatarHash: string;
    }
}

export interface SearchedConfession {
    __typename: string;
    createdAt: number;
    id: number;
    content: string;
}

export async function search(search: string, accessToken: string): Promise<[SearchResult]> {
    const out = await request<Data>(
        `${getRoot()}/graphql`,
        query,
        { query: search },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.search;
}
