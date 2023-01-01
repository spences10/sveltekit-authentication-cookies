import type { Record } from 'pocketbase'

interface User extends Record {
	id: string
	name: string
	username: string
	avatar?: string
}
