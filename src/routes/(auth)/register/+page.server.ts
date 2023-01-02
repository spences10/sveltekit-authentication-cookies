import { registerUserSchema } from '$lib/schemas'
import { generateUsername, validateData } from '$lib/utils'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			registerUserSchema
		)

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			})
		}

		let username = generateUsername(
			formData.name.toString().split(' ').join('')
		).toLowerCase()

		try {
			await locals.pb
				.collection('users')
				.create({ emailVisibility: false, username, ...formData })
			await locals.pb
				.collection('users')
				.requestVerification(formData.email.toString())
		} catch (err) {
			console.log(`Error: ${err}`)
			throw error(500, 'Something went wrong')
		}

		throw redirect(303, '/login')
	},
}
