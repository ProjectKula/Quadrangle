import { request } from 'graphql-request';
import { getRoot } from '$lib';
import query from './newPost.graphql?raw';
import { getAuthTokenClient } from '$lib/auth';
import { uploadToR2 } from '$lib/upload';

export interface NewPost {
    id: string;
    createdAt: number;
}

interface Data {
    createPost: NewPost;
}

export async function createNewPost(accessToken: string, content: string, attachments: File[]) {
    let snowflakes: string[] = [];
    for (let attachment in attachments) {
        let snowflake = await uploadToR2(attachment, getAuthTokenClient());
        if (snowflake == null) {
            console.log("Error uploading attachment");
            return;
        }
        snowflakes.push(snowflake);
    }

    const out = await request<Data>(
        `${getRoot()}/graphql`,
        query,
        { content: content, attachments: snowflakes },
        { Authorization: `Bearer ${accessToken}` }
    );

    return out.createPost;
}
