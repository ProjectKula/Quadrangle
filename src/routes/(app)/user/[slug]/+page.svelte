<script lang="ts">
	import UserProfile from '$lib/components/user/UserProfile.svelte';

	export let data;
</script>

<svelte:head>
	<title>User {data.id}</title>
</svelte:head>

<UserProfile {data} />
