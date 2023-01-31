<script>
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
	<Counter />
	<Counter />
	<Counter />
	<Counter />
	<Counter />
</section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
