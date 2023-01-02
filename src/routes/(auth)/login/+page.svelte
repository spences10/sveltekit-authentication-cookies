<script lang="ts">
	import { Input } from '$lib/components'
	import { ErrorIcon } from '$lib/icons'
	import type { ActionData } from './$types'

	export let form: ActionData
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
	>
		<Input
			id="email"
			type="email"
			label="Email"
			placeholder="Email"
			value={form?.data?.email ?? ''}
			errors={form?.errors?.email ?? []}
		/>
		<Input
			id="password"
			type="password"
			label="Password"
			placeholder="Password"
			errors={form?.errors?.password ?? []}
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
