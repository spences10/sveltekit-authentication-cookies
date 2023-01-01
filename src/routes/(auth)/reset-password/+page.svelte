<script lang="ts">
	import { AlertIcon } from '$lib/icons'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<div class="flex flex-col items-center prose-xl">
	<h2>Reset password</h2>
	<p>A link to reset your password will be emailed to you.</p>

	<form
		action="?/resetPassword"
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
			<input
				type="submit"
				value="Request reset link"
				class="btn btn-primary mt-6"
			/>
		</div>
		{#if form?.success}
			<div class="alert alert-success shadow-lg w-full max-w-md">
				<div>
					<AlertIcon />
					<span>Email with password resent link sent!</span>
				</div>
			</div>
		{/if}
	</form>
</div>
