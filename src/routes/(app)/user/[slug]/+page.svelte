<script lang="ts">
	import RegularUser from '$lib/components/user/RegularUser.svelte';
	import SelfUser from '$lib/components/user/SelfUser.svelte';

	export let data;
</script>

<svelte:head>
	<title>User {data.id}</title>
</svelte:head>

{#if data.isSelf}
	<SelfUser {data} />
{:else}
	<RegularUser {data} />
{/if}
