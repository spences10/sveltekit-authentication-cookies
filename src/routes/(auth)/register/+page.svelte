<div class="flex flex-col items-center prose-xl">
	<h2>Register for an account</h2>
	<p>
		Or <a href="/login" class="link-primary">login</a> if you already have
		an account
	</p>

	<form
		action="?/register"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-5"
	>
		<div class="form-control w-full max-w-md">
			<label for="Name">
				<span class="label-text">Name</span>
			</label>
			<input
				type="text"
				name="name"
				placeholder="Name"
				class="input input-primary"
			/>
		</div>
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
			<label for="passwordConfirm">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="passwordConfirm"
				placeholder="Confirm password"
				class="input input-primary"
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<input
				type="submit"
				value="Register"
				class="btn btn-primary mt-6"
			/>
		</div>
	</form>
</div>
