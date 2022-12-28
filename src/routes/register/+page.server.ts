import { redirect } from '@sveltejs/kit'
import type { Action, Actions } from './$types'

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData())
	},
}
