import { db } from '$lib/database'
import type { GetSession, Handle } from '@sveltejs/kit'
import * as cookie from 'cookie'

export const handle: Handle = async ({ event, resolve }) => {
  // populate event.locals with data from the database
  // expose that data on the server to be sent to the client/session
  const cookieHeader = event.request.headers.get('cookie')
  const cookies = cookie.parse(cookieHeader ?? '')

  if (!cookies.session) {
    return await resolve(event)
  }

  const session = await db.user.findUnique({
    where: { id: cookies.session },
  })

  if (session) {
    event.locals.user = { username: session.username  }
  }

  return await resolve(event)
}

export const getSession: GetSession = ({locals}) => {
  if (!locals.user) return {}
  
  return {
    user: {
      username: locals.user.username,
    }
  }
}
