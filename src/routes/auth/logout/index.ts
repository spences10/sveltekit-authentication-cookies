import type { RequestHandler } from '@sveltejs/kit'
import * as cookie from 'cookie'

export const GET:RequestHandler = async () => {
  return {
    status:303,
    headers:{
      'Set-Cookie':cookie.serialize('session', '', {
        path:'/',
        expires: new Date(0),
      }),
      location:'/',
    }
  }
}