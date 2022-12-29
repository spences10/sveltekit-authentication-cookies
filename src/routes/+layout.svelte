<script lang="ts">
	import Nav from '$lib/components/nav.svelte'
	import '../app.postcss'
	import type { LayoutData } from './$types'

	export let data: LayoutData
</script>

<Nav />
<main>
	<slot />
</main>
