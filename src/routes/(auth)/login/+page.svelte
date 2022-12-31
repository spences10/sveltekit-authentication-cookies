<script lang="ts">
	export let form: HTMLFormElement
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
		<div class="form-control w-full max-w-md">
			<input
				type="submit"
				value="Login"
				class="btn btn-primary mt-6"
			/>
		</div>
		{#if form?.notVerified}
			<div
				class="alert alert-error shadow-lg form-control w-full max-w-md"
			>
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
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Please verify your email before logging in.</span>
				</div>
			</div>
		{/if}
	</form>
</div>
