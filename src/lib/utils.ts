import type { Admin, Record } from 'pocketbase'

// https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
export const serializedNonPOJOs = (obj: Record | Admin | null) => {
	return structuredClone(obj)
}
