import type { Admin, Record } from 'pocketbase'
const { randomBytes } = await import('node:crypto')

// https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
export const serializedNonPOJOs = (obj: Record | Admin | null) => {
	return structuredClone(obj)
}

export const generateUsername = (name: string) => {
	const id = randomBytes(2).toString('hex')
	return `${name.slice(0, 8)}${id}`
}
