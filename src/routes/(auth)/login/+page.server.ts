import { loginUserSchema } from '$lib/schemas'
import { validateData } from '$lib/utils'
import { error, fail, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { Actions } from './$types'

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			loginUserSchema
		)

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			})
		}

		try {
			await locals.pb
				.collection('users')
				.authWithPassword(
					formData.email.toString(),
					formData.password.toString()
				)
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear()
				return {
					notVerified: true,
				}
			}
		} catch (err) {
			console.log(`Error: ${err}`)
			const e = err as ClientResponseError
			throw error(e.status, e.data.message)
		}

		throw redirect(303, '/')
	},
}
