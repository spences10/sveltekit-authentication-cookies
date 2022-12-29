<script lang="ts">
	import Nav from '$lib/components/nav.svelte'
	import '../app.postcss'
	import type { LayoutData } from './$types'

	export let data: LayoutData
	let { user } = data
</script>

<Nav {user} />
<main>
	<slot />
</main>
