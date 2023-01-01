import { PUBLIC_DATABASE_URL } from '$env/static/public'
import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'
import type { User } from './lib/types'
import { serializedNonPOJOs } from './lib/utils'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(PUBLIC_DATABASE_URL)
	event.locals.pb.authStore.loadFromCookie(
		event.request.headers.get('cookie') || ''
	)

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializedNonPOJOs(
			event.locals.pb.authStore.model
		) as User
	} else {
		event.locals.user = undefined
	}

	const response = await resolve(event)

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: true })
	)

	return response
}
