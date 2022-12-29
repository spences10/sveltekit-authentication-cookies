<nav class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl"
			>Auth with Pocketbase</a
		>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1 space-x-4">
			<li><a href="/" class="btn-sm btn-primary">Home</a></li>
			<li><a href="/login" class="btn-sm btn-primary">Login</a></li>
			<form action="/logout" method="POST">
				<li>
					<button type="submit" class="btn-sm btn-secondary">
						Logout
					</button>
				</li>
			</form>
		</ul>
	</div>
</nav>
