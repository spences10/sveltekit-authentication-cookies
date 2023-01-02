<script lang="ts">
	export let value = ''
	export let placeholder = ''
	export let id = ''
	export let label = ''
	export let type = 'text'
	export let disabled = false
	export let required = false
	export let errors: string[] = []
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<input
		class="input input-primary w-full max-w-lg"
		{type}
		{id}
		{placeholder}
		{required}
		{disabled}
		name={id}
		{value}
	/>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label">
				<span class="label-text-alt text-error">{error}</span>
			</label>
		{/each}
	{/if}
</div>
