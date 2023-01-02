<script lang="ts">
	import { Nav } from '$lib/components'
	import { Toaster } from 'svelte-french-toast'
	import '../app.postcss'
	import type { LayoutData } from './$types'

	export let data: LayoutData
	let { user } = data
</script>

<Toaster />
<Nav {user} />
<main>
	<slot />
</main>
