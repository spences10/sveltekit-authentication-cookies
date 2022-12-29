import { generateUsername } from '$lib/utils'
import { error, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData())

		let username = generateUsername(
			body.name.toString().split(' ').join('')
		).toLowerCase()

		try {
			await locals.pb
				.collection('users')
				.create({ emailVisibility: true, username, ...body })
		} catch (err) {
			console.log(`Error: ${err}`)
			throw error(500, 'Something went wrong')
		}

		throw redirect(303, '/login')
	},
}
