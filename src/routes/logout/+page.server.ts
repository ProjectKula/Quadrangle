export const load = async ({ cookies }) => {
  cookies.set('accessToken', '', {
    path: '/',
    maxAge: 0
  })
  cookies.set('refreshToken', '', {
    path: '/',
    maxAge: 0
  })
  cookies.set('expiresAt', '', {
    path: '/',
    maxAge: 0
  })
}
