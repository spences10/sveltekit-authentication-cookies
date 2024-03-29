// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type PocketBase from 'pocketbase'
import type { User } from 'pocketbase'

declare global {
	declare namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase
			user: User | undefined
		}
		// interface PageData {}
		// interface Platform {}
	}
}
