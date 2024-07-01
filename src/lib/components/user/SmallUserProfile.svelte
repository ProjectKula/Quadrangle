<script lang="ts">
  import { PUBLIC_BUCKET_URL } from '$env/static/public';
  import { getAuthTokenClient } from '$lib/auth';
  import { getFollowers, getFollowing } from '$lib/graphql/user/follow/following';
  import type { User } from '$lib/graphql/user/user';
  import { getBranchName } from '$lib/misc/branches';
  import LazyUserListModal from '../posts/LazyUserListModal.svelte';

  export let data: User;
  export let linked: boolean = false;

  $: followers = data.followerCount;
  $: following = data.followingCount;

  let displayFollowersModal = false;
  let displayFollowingModal = false;

  let avatarUrl = data.avatarHash ? `${PUBLIC_BUCKET_URL}/${data.avatarHash}` : '/default_pfp.svg';

  const formatDate = (unixSeconds: number) => {
    const date = new Date(Math.round(unixSeconds) * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
</script>

<div class="flex flex-col md:flex-row">
  <img src={avatarUrl} alt="Avatar" class="w-32 h-32 rounded-full" />
  <div class="flex flex-col md:ml-4">
    <div class="flex flex-row items-center flex-wrap gap-2">
      <h2 class="text-2xl">
        {#if linked}
          <a href="/user/{data.id}" class="hoverBlue">{data.name}</a>
        {:else}
          {data.name}
        {/if}
      </h2>
      {#if data.pronouns}
        <p class="text-neutral-500">{data.pronouns}</p>
      {/if}
    </div>

    <p class="text-neutral-500">
      {getBranchName(data.branch)}
    </p>

    <div class="flex flex-col w-60">
      <div class="grid grid-cols-2 gap-x-5 gap-y-2 text-center">
        <button on:click={() => displayFollowersModal = true}>{followers} follower{followers === 1 ? '' : 's'}</button>
        <button on:click={() => displayFollowingModal = true}>{following} following</button>

        <slot name="grid-extra"></slot>
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

{#if displayFollowersModal}
  <LazyUserListModal getPage={(num) => getFollowers(data.id, 5, num, getAuthTokenClient())} totalCount={followers} heading="Followers" bind:display={displayFollowersModal} />
{/if}

{#if displayFollowingModal}
  <LazyUserListModal getPage={(num) => getFollowing(data.id, 5, num, getAuthTokenClient())} totalCount={following} heading="Following" bind:display={displayFollowingModal} />
{/if}
