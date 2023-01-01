<script lang="ts">
	import {
		applyAction,
		enhance,
		type SubmitFunction,
	} from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { Input } from '$lib/components'
	import { PencilIcon } from '$lib/icons'
	import type { User } from '$lib/types'
	import { getPocketbaseImageURL } from '$lib/utils'
	import type { PageData } from '../$types'

	export let data: PageData
	let { user } = data as User
	let loading: boolean = false
	$: loading = false

	const handleAvatarChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		const file = target.files?.[0]
		if (file) {
			let src = URL.createObjectURL(file)
			let preview = document.getElementById(
				'avatar-preview'
			) as HTMLImageElement
			preview.src = src
		}
	}

	const updateProfile: SubmitFunction = async () => {
		loading = true
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll()
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

<div class="flex flex-col items-center">
	<h3>Update profile</h3>
	<form
		action="?/updateProfile"
		method="POST"
		enctype="multipart/form-data"
		use:enhance={updateProfile}
		class="flex flex-col items-center space-y-2 w-full pt-5"
	>
		<div class="form-control w-full max-w-md">
			<label for="avatar" class="label">
				<span class="label-text">Profile picture</span>
			</label>
			<label
				for="avatar"
				class="avatar w-32 rounded-full hover:cursor-pointer"
			>
				<label
					for="avatar"
					class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer"
				>
					<span class="btn btn-circle btn-sm btn-secondary">
						<PencilIcon />
					</span>
				</label>
				<div class="w-32 rounded-full">
					<img
						src={user?.avatar
							? getPocketbaseImageURL(
									user?.collectionId,
									user?.id,
									user?.avatar
							  )
							: `https://ui-avatars.com/api/?name=${user?.name}`}
						alt="user avatar"
						id="avatar-preview"
					/>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				on:change={handleAvatarChange}
				disabled={loading}
			/>
		</div>
		<Input
			id="name"
			label="Name"
			placeholder="Enter your name"
			value={user?.name}
			required
			disabled={loading}
		/>
		<div class="form-control w-full max-w-lg">
			<input
				type="submit"
				value="Update profile"
				class="btn btn-primary mt-6"
				disabled={loading}
			/>
		</div>
	</form>
</div>
