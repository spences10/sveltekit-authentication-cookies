<script lang="ts">
	import {
		applyAction,
		enhance,
		type SubmitFunction,
	} from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { Input, Modal } from '$lib/components'
	import type { ActionData, PageData } from './$types'

	export let form: ActionData
	export let data: PageData
	let loading: boolean = false

	let emailModalOpen: boolean = false
	let usernameModalOpen: boolean = false

	$: emailModalOpen = false
	$: usernameModalOpen = false
	$: loading = false

	const submitUpdateEmail: SubmitFunction = async () => {
		loading = true
		emailModalOpen = true
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll()
					emailModalOpen = false
					break
				case 'error':
					break
				default:
					await applyAction(result)
			}
			loading = false
		}
	}

	const submitUpdateUsername: SubmitFunction = async () => {
		loading = true
		usernameModalOpen = true
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll()
					usernameModalOpen = false
					break
				case 'error':
					break
				default:
					await applyAction(result)
			}
			loading = false
		}
	}
</script>

<div class="flex flex-col h-full w-full space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change email</h3>
		<div class="divider" />
		<Input
			id="email"
			label="Email"
			value={data?.user?.email}
			disabled
		/>
		<Modal label="change-email" checked={emailModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change email</span>
			<h3 slot="heading">Change your email</h3>
			<form
				action="?/updateEmail"
				method="POST"
				class="space-y-2"
				use:enhance={submitUpdateEmail}
			>
				<Input
					id="email"
					label="New email"
					type="email"
					required={true}
					value={form?.data?.email ?? ''}
					disabled={loading}
					errors={form?.errors?.email}
				/>
				<button
					type="submit"
					class="btn btn-primary w-full"
					disabled={loading}
				>
					Confirm
				</button>
			</form>
		</Modal>
	</div>
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change username</h3>
		<div class="divider" />
		<Input
			id="username"
			label="Username"
			value={data?.user?.username}
			disabled
		/>
		<Modal label="change-username" checked={usernameModalOpen}>
			<span slot="trigger" class="btn btn-primary">
				Change username
			</span>
			<h3 slot="heading">Change your username</h3>
			<form
				action="?/updateUsername"
				method="POST"
				class="space-y-2"
				use:enhance={submitUpdateUsername}
			>
				<Input
					id="username"
					label="Change username"
					type="text"
					required={true}
					value={form?.data?.username ?? ''}
					disabled={loading}
					errors={form?.errors?.username}
				/>
				<button
					type="submit"
					class="btn btn-primary w-full"
					disabled={loading}
				>
					Confirm
				</button>
			</form>
		</Modal>
	</div>
</div>
