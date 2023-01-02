import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas'
import { validateData } from '$lib/utils'
import { error, fail, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login')
	}
}

export const actions: Actions = {
	updateEmail: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			updateEmailSchema
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
				.requestEmailChange(formData?.email.toString())
		} catch (err) {
			console.log(`Error: ${err}`)
			const e = err as ClientResponseError
			throw error(e.status, e.data.message)
		}

		// user to log in again after email change
		locals.pb.authStore.clear()
		locals.user = undefined

		return {
			success: true,
			// data,
			status: 303,
			headers: { Location: '/' },
		}
	},
	updateUsername: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			updateUsernameSchema
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
				.getFirstListItem(`username = "${formData?.username}"`)
		} catch (err) {
			const e = err as ClientResponseError
			if (e.status === 404) {
				try {
					let { username } = await locals.pb
						.collection('users')
						.update(locals.user.id, { username: formData?.username })
					locals.user.username = username
					return {
						success: true,
						data: { username },
					}
				} catch (err) {
					console.log(`Error: ${err}`)
					throw error(e.status, e.data.message)
				}
			}
			console.log(`Error: ${err}`)
			throw error(e.status, e.data.message)
		}

		return {
			success: true,
			// data,
		}
	},
}
