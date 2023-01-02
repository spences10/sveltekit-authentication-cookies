import { error, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { Actions } from './$types'

export const actions: Actions = {
	changePassword: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData())

		try {
			await locals.pb.collection('users').update(locals.user.id, body)
			locals.pb.authStore.clear()
		} catch (err) {
			console.log(`Error: ${err}`)
			const e = err as ClientResponseError
			throw error(e.status, e.data.message)
		}

		throw redirect(303, '/login')
	},
}
