<script lang="ts">
	import RegularUser from '$lib/components/user/RegularUser.svelte';
	import SelfUser from '$lib/components/user/SelfUser.svelte';

	export let data;
</script>

{#if data.isSelf}
	<SelfUser {data} />
{:else}
	<RegularUser {data} />
{/if}
