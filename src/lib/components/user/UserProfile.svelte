<script lang="ts">


  import type { User } from '$lib/graphql/user/user';
  import { getBranchName } from '$lib/misc/branches';
  import RecentPostCard from '$lib/components/posts/RecentPostCard.svelte';

  export let data: User;
  let posts = data.posts.items.sort((a, b) => b.createdAt - a.createdAt);
  let curPage = 1;
  let totalPages = data.posts.metadata.pageCount;

  const formatDate = (unixSeconds: number) => {
    const date = new Date(Math.round(unixSeconds) * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
</script>

<div class="flex flex-col">
  <div class="flex flex-col md:flex-row mb-4">
    <img src="/default_pfp.svg" alt="Avatar" class="w-32 h-32 rounded-full" />
    <div class="flex flex-col md:ml-4">
      <div class="flex flex-row">
        <h2 class="text-2xl">{data.name}</h2>
        {#if data.pronouns}
          <p class="text-neutral-500">{data.pronouns}</p>
        {/if}
      </div>

      <p class="text-neutral-500">{getBranchName(data.branch)}</p>

      <div class="grid grid-cols-2 gap-x-5 gap-y-2 w-52 text-center">
        <p>{data.followerCount} follower{data.followerCount === 1 ? "" : "s"} </p>
        <p>{data.followingCount} following</p>

        {#if data.isSelf}
          <button class="btn-success py-1">Edit Profile</button>
          <button class="btn-secondary py-1">Settings</button>
        {/if}
      </div>

      <p class="mt-4">Reg. #{data.id} • User since {formatDate(data.dateRegistered)}</p>
    </div>
  </div>

  <!--	<div class="mb-4">-->
  <!--		{#if data.gender !== 'X'}-->
  <!--			<p>Gender: {data.gender}</p>-->
  <!--		{/if}-->
  <!--	</div>-->
  <div class="flex flex-col gap-4 m-4">
    <h1 class="text-semibold text-xl">Recent posts</h1>

    {#each posts as post}
      <RecentPostCard post={post} />
    {/each}
  </div>
</div>
