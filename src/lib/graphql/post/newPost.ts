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
    console.log(attachments);
    let snowflakes: string[] = [];
    for (let i = 0; i < attachments.length; i++) {
        let attachment = attachments[i];
        console.log(attachment);
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
