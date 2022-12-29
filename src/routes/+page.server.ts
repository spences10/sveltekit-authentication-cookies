import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent, locals }) => {
  // check account is authenticated by waiting for +layout.server.ts
	await parent()
	if (locals.user) {
		return {
			user: locals.user,
		}
	}

	throw redirect(303, '/login')
}
