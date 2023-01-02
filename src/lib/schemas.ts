import { z } from 'zod'

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: `Email is required` })
		.email({ message: `Email is invalid` }),
	password: z.string({ required_error: `Password is required` }),
})

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: `Name is required` })
			.regex(/^[a-zA-Z ]+$/, {
				message: `Name can only contain letters and spaces`,
			})
			.min(2, { message: `Name must be at least 2 characters` })
			.max(64, {
				message: `Name must be less than 64 characters`,
			})
			.trim(),
		email: z.string({ required_error: `Email is required` }).email({
			message: `Email is invalid`,
		}),
		password: z
			.string({ required_error: `Password is required` })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
				message: `Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number`,
			}),
		passwordConfirm: z
			.string({ required_error: `Please confirm password` })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
				message: `Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number`,
			}),
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password and Confirm Password must match',
				path: ['password'],
			})
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password and Confirm Password must match',
				path: ['passwordConfirm'],
			})
		}
	})

export const updateEmailSchema = z.object({
	email: z.string({ required_error: `Email is required` }).email({
		message: `Email is invalid`,
	}),
})

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: `Username is required` })
		.regex(/^[a-zA-Z0-9]+$/, {
			message: `Username can only contain letters and numbers`,
		})
		.min(3, { message: `Username must be at least 3 characters` })
		.max(24, {
			message: `Username must be less than 24 characters or less`,
		})
		.regex(/^[a-zA-Z0-9]+$/, {
			message: `Username can only contain letters and numbers`,
		})
		.trim(),
})
