import { updateProfileSchema } from '$lib/schemas'
import { validateData } from '$lib/utils'
import { error, fail, redirect } from '@sveltejs/kit'
import { serialize } from 'object-to-formdata'
import type { PageServerLoad } from '../$types'
import type { Actions } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login')
	}
}

export const actions: Actions = {
	updateProfile: async ({ locals, request }) => {
		let body = await request.formData()
		let userAvatar = body.get('avatar') as Blob

		if (userAvatar.size === 0) {
			body.delete('avatar')
		}

		const { formData, errors } = await validateData(
			body,
			updateProfileSchema
		)
		const { avatar, ...rest } = formData

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors,
			})
		}

		try {
			let { name, avatar } = await locals.pb
				.collection('users')
				.update(locals?.user?.id, serialize(formData))
			locals.user.name = name
			locals.user.avatar = avatar
		} catch (err) {
			console.log(`Error: ${err}`)
			throw error(500, 'Something went wrong updating profile')
		}
		return {
			success: true,
		}
	},
}
