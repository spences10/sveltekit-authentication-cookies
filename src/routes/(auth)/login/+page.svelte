<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import { Input } from '$lib/components'
	import { ErrorIcon } from '$lib/icons'
	import toast from 'svelte-french-toast'
	import type { ActionData } from './$types'

	export let form: ActionData
	let loading = false

	const submitLogin: SubmitFunction = async () => {
		loading = true
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update()
					break
				case 'failure':
					toast.error('Invalid email or password')
					await update()
					break
				case 'error':
					toast.error(result.error.message)
					await update()
					break
				default:
					await update()
			}
			loading = false
		}
	}
</script>

<div class="flex flex-col items-center prose-xl">
	<h2>Login to your account</h2>
	<p>
		Or <a href="/register" class="link-primary">register</a> if you don't
		have an account
	</p>

	<form
		action="?/login"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-5"
		use:enhance={submitLogin}
	>
		<Input
			id="email"
			type="email"
			label="Email"
			placeholder="Email"
			value={form?.data?.email ?? ''}
			errors={form?.errors?.email ?? []}
			disabled={loading}
		/>
		<Input
			id="password"
			type="password"
			label="Password"
			placeholder="Password"
			errors={form?.errors?.password ?? []}
			disabled={loading}
		/>
		<div class="w-full max-w-lg">
			<a href="/reset-password" class="link-primary">
				Forgot password?
			</a>
		</div>
		<div class="form-control w-full max-w-lg">
			<input
				type="submit"
				value="Login"
				class="btn btn-primary mt-6"
				disabled={loading}
			/>
		</div>
		{#if form?.notVerified}
			<div class="alert alert-error shadow-lg w-full max-w-lg">
				<div>
					<ErrorIcon />
					<span>Please verify your email before logging in.</span>
				</div>
			</div>
		{/if}
	</form>
</div>
