import { updatePasswordSchema } from '$lib/schemas'
import { validateData } from '$lib/utils'
import { error, fail, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { PageServerLoad } from '../$types'
import type { Actions } from './$types'

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

export const actions: Actions = {
	changePassword: async ({ locals, request }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			updatePasswordSchema
		)

		if (errors) {
			return fail(400, {
				errors: errors.fieldErrors,
			})
		}

		try {
			await locals.pb
				.collection('users')
				.update(locals.user.id, formData)
			locals.pb.authStore.clear()
		} catch (err) {
			console.log(`Error: ${err}`)
			const e = err as ClientResponseError
			throw error(e.status, e.data.message)
		}

		throw redirect(303, '/login')
	},
}
