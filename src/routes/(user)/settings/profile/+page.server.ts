import { error } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	updateProfile: async ({ locals, request }) => {
		let body = await request.formData()
		let userAvatar = body.get('avatar') as Blob

		if (userAvatar?.size === 0) {
			body.delete('avatar')
		}

		try {
			let { name, avatar } = await locals.pb
				.collection('users')
				.update(locals?.user?.id, body)
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
