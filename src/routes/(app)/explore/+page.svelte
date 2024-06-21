<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import type { User } from "$lib/graphql/user/user";
  import { getBranchName } from "$lib/misc/branches";

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
    <div class="flex flex-col md:flex-row">
      <img src={user.avatarHash ? `${PUBLIC_BUCKET_URL}/${user.avatarHash}` : '/default_pfp.svg'} alt="Avatar" class="w-32 h-32 rounded-full" />
      <div class="flex flex-col md:ml-4">
        <div class="flex flex-row items-center flex-wrap gap-2">
          <a href={`/user/${user.id}`} class="hoverBlue text-2xl">{user.name}</a>
          {#if user.pronouns}
            <p class="text-neutral-500">{user.pronouns}</p>
          {/if}
        </div>
  
        <p class="text-neutral-500">
          {getBranchName(user.branch)}
        </p>
  
        <div class="flex flex-col w-60">
  
          <div class="grid grid-cols-2 gap-x-5 gap-y-2 text-center">
            <p>{user.followerCount} follower{user.followerCount === 1 ? '' : 's'}</p>
            <p>{user.followingCount} following</p>
          </div>
  
          {#if user.bio}
            <p class="">{user.bio}</p>
          {/if}
  
          <div class="flex flex-row justify-between">
            <span>Reg. #{user.id}</span>
            •
            <span>User since {formatDate(user.dateRegistered)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/each}
</div>
