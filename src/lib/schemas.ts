import { z } from 'zod'

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: `Email is required` })
		.email({ message: `Email is invalid` }),
	password: z.string({ required_error: `Password is required` }),
})
