<script lang="ts">
	import SelfUser from '$lib/components/user/SelfUser.svelte';

	export let data;
</script>

<svelte:head>
	<title>User {data.id}</title>
</svelte:head>

<SelfUser data={data} />
