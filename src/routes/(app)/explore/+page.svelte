<script lang="ts">
  import SmallUserProfile from "$lib/components/user/SmallUserProfile.svelte";
  import type { User } from "$lib/graphql/user/user";
  
  interface Data {
    users: User[];
  }

  export let data: Data;
  $: users = data.users.sort((a, b) => - (a.id - b.id));

  const formatDate = (unixSeconds: number) => {
    const date = new Date(Math.round(unixSeconds) * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
</script>

<svelte:head>
  <title>Explore</title>
</svelte:head>

<div class="flex flex-col gap-4">
  {#each users as user}
  <div class="flex flex-col bg-neutral-200 p-4 rounded-lg dark:bg-neutral-800">
    <SmallUserProfile data={user} linked={true} />
  </div>
  {/each}
</div>
