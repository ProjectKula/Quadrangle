import { request, gql } from 'graphql-request';
import { PUBLIC_ROOT_URL } from '$env/static/public';
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
  id: string
  name: string
  phone: string
  pronouns: string
}

interface Data {
  user: User
}

export const load = async ({ params, cookies }) => {
  const numberSlug = parseInt(params.slug);

  if (!numberSlug) {
    error(404, "Not found")
  }

  const out = await request<Data>(
    `${PUBLIC_ROOT_URL}/graphql`,
    query,
    { id: numberSlug },
    { Authorization: `Bearer ${cookies.get('accessToken')}`, }
  )

  return {
    slug: params.slug,
    ...out.user
  }
}
