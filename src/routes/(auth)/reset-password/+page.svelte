<script lang="ts">
	export let form: HTMLFormElement
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Email with password resent link sent!</span>
				</div>
			</div>
		{/if}
	</form>
</div>
