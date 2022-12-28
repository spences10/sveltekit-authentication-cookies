import type { LayoutLoad } from './$types'

export const load: LayoutLoad = ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user,
		}
	}

	return {
		user: undefined,
	}
}
