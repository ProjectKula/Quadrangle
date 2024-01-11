import { gql, request } from 'graphql-request';
import { getRootUrl } from '$lib/index';

export interface NewPost {
	id: string
	createdAt: number
}

interface Data {
	createPost: NewPost
}

export async function createNewPost(accessToken: string, content: string) {
	const query = gql`
      mutation NewPost($content: String!) {
          createPost(creator: null, content: $content) {
              id
              createdAt
          }
      }
	`

	const out = await request<Data>(
		`${getRootUrl()}/graphql`,
		query,
		{ content: content },
		{ Authorization: `Bearer ${accessToken}`, }
	)

	return out.createPost;
}
