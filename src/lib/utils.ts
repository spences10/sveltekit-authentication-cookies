import { PUBLIC_DATABASE_URL } from '$env/static/public'
import type { Admin, Record } from 'pocketbase'
import type { z, ZodError } from 'zod'
const { randomBytes } = await import('node:crypto')

// https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
export const serializedNonPOJOs = (obj: Record | Admin | null) => {
	return structuredClone(obj)
}

export const generateUsername = (name: string) => {
	const id = randomBytes(2).toString('hex')
	return `${name.slice(0, 8)}${id}`
}

export const getPocketbaseImageURL = (
	collection: string,
	recordId: string,
	fileName: string | undefined,
	size = '0x0'
) => {
	return `${PUBLIC_DATABASE_URL}/api/files/${collection}/${recordId}/${fileName}?thumb=${size}`
}

export const validateData = async <T extends z.ZodTypeAny>(
	formData: FormData,
	schema: T
) => {
	const body = Object.fromEntries(formData.entries()) as z.infer<T>
	try {
		const data = await schema.parseAsync(body)

		return {
			formData: data,
			error: null,
		}
	} catch (err) {
		console.log(`Error: ${err}`)
		const errors = (err as ZodError).flatten()
		return {
			formData: body,
			errors,
		}
	}
}
