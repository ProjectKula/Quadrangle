import { request } from 'graphql-request';
import { getRoot } from '$lib/index';
import latestConfesssionQuery from './confessionLatest.graphql?raw';
import confessionsPageQuery from './confessionsPage.graphql?raw';

export interface Confession {
  id: number;
  content: string;
  createdAt: number;
}

export interface ConfessionsPage {
  metadata: PageMeta;
  items: Confession[];
}

export interface PageMeta {
  page: number;
  pageCount: number;
}

export interface Data {
  latestConfession: Confession;
}

export interface Data2 {
  confessionsPage: ConfessionsPage;
}

export async function latestConfession(accessToken: string) {
    const out = await request<Data>(
        `${getRoot()}/graphql`,
        latestConfesssionQuery,
        { },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.latestConfession;
}

export async function confessionsPage(accessToken: string, page: number) {
    const out = await request<Data2>(
        `${getRoot()}/graphql`,
        confessionsPageQuery,
        { page: page },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.confessions;
}
