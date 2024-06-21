<script lang="ts">
  import { PUBLIC_BUCKET_URL } from '$env/static/public';
  import type { User } from '$lib/graphql/user/user';
  import { getBranchName } from '$lib/misc/branches';
  import RecentPostCard from '$lib/components/posts/RecentPostCard.svelte';
  import EditProfileModal from './EditProfileModal.svelte';
  import { follow, unfollow } from '$lib/graphql/user/follow/following';
  import { getAuthTokenClient } from '$lib/auth';

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

  let followers = data.followerCount;
  let following = data.followingCount;
  let followedBySelf = data.followedBySelf;

  let avatarUrl = data.avatarHash ? `${PUBLIC_BUCKET_URL}/${data.avatarHash}` : '/default_pfp.svg';

  let showEditModal = false;

  let disabledFollow = false;

  function followUser(id: number) {
    followedBySelf = true;
    disabledFollow = true;
    follow(data.id, getAuthTokenClient())
      .then((num) => {
        followers = num;
      })
      .finally(() => {
        disabledFollow = false;
      });
  }

  function unfollowUser(id: number) {
    followedBySelf = false;
    disabledFollow = true;
    unfollow(data.id, getAuthTokenClient())
      .then((num) => {
        followers = num;
      })
      .finally(() => {
        disabledFollow = false;
      });
  }
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

      <p class="text-neutral-500">
        {getBranchName(data.branch)}
      </p>

      <div class="flex flex-col w-60">

        <div class="grid grid-cols-2 gap-x-5 gap-y-2 text-center">
          <p>{followers} follower{followers === 1 ? '' : 's'}</p>
          <p>{following} following</p>

          {#if data.isSelf}
            <button class="btn-success py-1 text-black" on:click={() => (showEditModal = true)}>Edit Profile</button>
            <a href="/settings" class="contents"><button class="btn-secondary py-1 invertColors">Settings</button></a>
          {:else if followedBySelf}
            <button disabled={disabledFollow} class="col-span-2 btn-secondary py-1 invertColors" on:click={() => unfollowUser(data.id)}>Unfollow</button>
          {:else}
            <button disabled={disabledFollow} class="col-span-2 btn-success py-1 text-black" on:click={() => followUser(data.id)}>Follow</button>
          {/if}
        </div>

        {#if data.bio}
          <p class="">{data.bio}</p>
        {/if}

        <div class="flex flex-row justify-between">
          <span>Reg. #{data.id}</span>
          •
          <span>User since {formatDate(data.dateRegistered)}</span>
        </div>
      </div>
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
      <RecentPostCard {post} />
    {/each}
  </div>
</div>

{#if data.isSelf}
  <EditProfileModal bind:pronouns={data.pronouns} bind:bio={data.bio} bind:show={showEditModal} bind:avatarUrl />
{/if}
