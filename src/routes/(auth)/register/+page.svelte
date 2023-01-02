<script lang="ts">
	import { Input } from '$lib/components'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

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
		<Input
			id="name"
			label="Name"
			placeholder="Name"
			value={form?.data?.name}
			errors={form?.errors?.name}
		/>
		<Input
			id="email"
			type="email"
			label="Email"
			placeholder="Email"
			value={form?.data?.email}
			errors={form?.errors?.email}
		/>
		<Input
			id="password"
			type="password"
			label="Password"
			placeholder="Password"
			errors={form?.errors?.password}
		/>
		<Input
			id="passwordConfirm"
			type="password"
			label="Confirm password"
			placeholder="Confirm password"
			errors={form?.errors?.passwordConfirm}
		/>
		<div class="form-control w-full max-w-lg">
			<input
				type="submit"
				value="Register"
				class="btn btn-primary mt-6"
			/>
		</div>
	</form>
</div>
