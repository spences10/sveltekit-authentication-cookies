<script lang="ts">
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
		<div class="form-control w-full max-w-md">
			<label for="email">
				<span class="label-text">Email</span>
			</label>
			<input
				type="text"
				name="email"
				placeholder="Email"
				class="input input-primary"
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<label for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				placeholder="Password"
				class="input input-primary"
			/>
		</div>
		<div class="w-full max-w-md">
			<a href="/reset-password" class="link-primary">
				Forgot password?
			</a>
		</div>
		<div class="form-control w-full max-w-md">
			<input
				type="submit"
				value="Login"
				class="btn btn-primary mt-6"
			/>
		</div>
		{#if form?.notVerified}
			<div class="alert alert-error shadow-lg w-full max-w-md">
				<div>
					<ErrorIcon />
					<span>Please verify your email before logging in.</span>
				</div>
			</div>
		{/if}
	</form>
</div>
