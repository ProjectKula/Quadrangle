<script lang="ts">
  import UserProfile from '$lib/components/user/UserProfile.svelte';

  export let data;
</script>

<svelte:head>
  <title>My Profile</title>
</svelte:head>

<UserProfile data={data} />
