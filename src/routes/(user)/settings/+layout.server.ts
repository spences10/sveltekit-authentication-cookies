import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login')
  }
}
