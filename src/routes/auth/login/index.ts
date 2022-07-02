import { db } from '$lib/database'
import type { RequestHandler } from '@sveltejs/kit'
import * as bycrypt from 'bcryptjs'
import * as cookie from 'cookie'

export const post: RequestHandler = async ({ request }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') {
    return {
      status: 400,
      body: { error: 'Enter valid username and password.' },
    }
  }

  if (!username || !password) {
    return {
      status: 400,
      body: { error: 'Username and password required.' },
    }
  }

  const user = await db.user.findUnique({
    where: { username },
  })
  const passwordMatch =
    user && (await bycrypt.compare(password, user.passwordHash))

  if (!user || !passwordMatch) {
    return {
      status: 400,
      body: { error: 'You entered the wrong credentials.' },
    }
  }

  return {
    status: 200,
    body: {
      user: { username },
      success: 'You are logged in.',
    },
    headers: {
      'Set-Cookie': cookie.serialize('session', user.id, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      }),
    },
  }
}
