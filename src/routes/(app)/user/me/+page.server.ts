import { request, gql } from 'graphql-request';
import { getRootUrl } from '$lib/index';
import { error } from '@sveltejs/kit';

const query = gql`
  query User($id: Int!) {
    user(id: $id) {
      branch
      dateRegistered
      email
      gender
      name
      phone
      pronouns
    }
  }
`

export interface User {
  branch: string
  dateRegistered: number
  email: string
  gender: string
  name: string
  phone: string
  pronouns: string
}

interface Data {
  user: User
}

export const load = async ({ params, cookies }) => {
  // const numberSlug = parseInt(params.slug);
  const numberSlug = 1;

  if (!numberSlug) {
    error(404, "Not found")
  }

  const out = await request<Data>(
    `${getRootUrl()}/graphql`,
    query,
    { id: numberSlug },
    { Authorization: `Bearer ${cookies.get('accessToken')}`, }
  )

  return {
    slug: "1",
    ...out.user
  }
}
