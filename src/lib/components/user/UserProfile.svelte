<script lang="ts">
  import { PUBLIC_BUCKET_URL } from '$env/static/public';
  import type { User } from '$lib/graphql/user/user';
  import { getBranchName } from '$lib/misc/branches';
  import RecentPostCard from '$lib/components/posts/RecentPostCard.svelte';
  import EditProfileModal from './EditProfileModal.svelte';

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

  let avatarUrl = data.avatarHash ? `${PUBLIC_BUCKET_URL}/${data.avatarHash}` : '/default_pfp.svg';

  let showEditModal = false;
</script>

<div class="flex flex-col">
  <div class="flex flex-col md:flex-row mb-4">
    <img src={avatarUrl} alt="Avatar" class="w-32 h-32 rounded-full" />
    <div class="flex flex-col md:ml-4">
      <div class="flex flex-row items-center flex-wrap gap-2">
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
          <button class="btn-success py-1 text-black" on:click={() => showEditModal = true}>Edit Profile</button>
          <a href="/settings" class="contents"><button class="btn-secondary py-1 invertColors">Settings</button></a>
        {/if}
      </div>

      {#if data.bio}
        <p class="">{data.bio}</p>
      {/if}
      
      <p class="">Reg. #{data.id} • User since {formatDate(data.dateRegistered)}</p>
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

{#if data.isSelf}
  <EditProfileModal bind:pronouns={data.pronouns} bind:bio={data.bio} bind:show={showEditModal} bind:avatarUrl={avatarUrl} />
{/if}
