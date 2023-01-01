<script lang="ts">
	import { page } from '$app/stores'

	let links = [
		{ href: `/settings/profile`, title: `Profile` },
		{ href: `/settings/account`, title: `Account` },
		{ href: `/settings/security`, title: `Security` },
	]
</script>

<div class="w-full h-full px-4 prose-xl">
	<h2>Settings</h2>
	<div class="divider" />
</div>
<div class="flex w-full h-full space-x-4">
	<ul class="menu bg-base-100 w-56 p-2 rounded-box">
		{#each links as { href, title }}
			<li>
				<a
					{href}
					class="font-medium  {$page.url.pathname === href
						? `active`
						: ``}"
				>
					{title}
				</a>
			</li>
		{/each}
	</ul>
	<div class="w-full">
		<slot />
	</div>
</div>
