<script lang="ts">
	import { Input } from '$lib/components'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<div class="flex flex-col h-full w-full space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change password</h3>
		<div class="divider" />
		<form action="?/changePassword" method="POST" class="space-y-2">
			<Input
				id="oldPassword"
				label="Old password"
				type="password"
				required
			/>
			<a href="/reset-password" class="link-primary">
				Forgot password?
			</a>
			<Input
				id="password"
				label="New password"
				type="password"
				required
			/>
			<Input
				id="passwordConfirm"
				label="Confirm new password"
				type="password"
				required
			/>
			<button type="submit" class="btn btn-primary w-full max-w-lg">
				Change password
			</button>
		</form>
	</div>
</div>
