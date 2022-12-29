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
	</form>
</div>
