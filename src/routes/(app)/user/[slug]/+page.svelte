<script lang="ts">
  import UserProfile from '$lib/components/user/UserProfile.svelte';

  export let data;
</script>

<svelte:head>
  <title>{data.isSelf ? "My Profile" : data.name}</title>
</svelte:head>

<UserProfile data={data} />
