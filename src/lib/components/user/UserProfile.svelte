<script lang="ts">
  import { PUBLIC_BUCKET_URL } from '$env/static/public';
  import type { User } from '$lib/graphql/user/user';
  import RecentPostCard from '$lib/components/posts/RecentPostCard.svelte';
  import EditProfileModal from './EditProfileModal.svelte';
  import { follow, unfollow } from '$lib/graphql/user/follow/following';
  import { getAuthTokenClient } from '$lib/auth';
  import SmallUserProfile from './SmallUserProfile.svelte';

  export let data: User;
  let posts = data.posts.items.sort((a, b) => b.createdAt - a.createdAt);
  let avatarUrl = data.avatarHash ? `${PUBLIC_BUCKET_URL}/${data.avatarHash}` : '/default_pfp.svg';
  let showEditModal = false;
  let disabledFollow = false;
  
  $: followedBySelf = data.followedBySelf;

  function followUser(id: number) {
    data.followedBySelf = true;
    disabledFollow = true;
    follow(data.id, getAuthTokenClient())
      .then((num) => {
        data.followerCount = num;
      })
      .finally(() => {
        disabledFollow = false;
      });
  }

  function unfollowUser(id: number) {
    data.followedBySelf = false;
    disabledFollow = true;
    unfollow(data.id, getAuthTokenClient())
      .then((num) => {
        data.followerCount = num;
      })
      .finally(() => {
        disabledFollow = false;
      });
  }
</script>

<div class="flex flex-col">
  <SmallUserProfile bind:data={data}>
    <div class="contents" slot="grid-extra">
      {#if data.isSelf}
        <button class="btn-success py-1 text-black" on:click={() => (showEditModal = true)}>Edit Profile</button>
        <a href="/settings" class="contents"><button class="btn-secondary py-1 invertColors">Settings</button></a>
      {:else if followedBySelf}
        <button disabled={disabledFollow} class="col-span-2 btn-secondary py-1 invertColors" on:click={() => unfollowUser(data.id)}>Unfollow</button>
      {:else}
        <button disabled={disabledFollow} class="col-span-2 btn-success py-1 text-black" on:click={() => followUser(data.id)}>Follow</button>
      {/if}
    </div>
  </SmallUserProfile>

  <div class="flex flex-col gap-4 m-4 w-full max-w-screen-sm place-self-center">
    <h1 class="text-semibold text-xl">
      {data.isSelf ? 'Your' : 'Recent'} posts
    </h1>

    {#each posts as post}
      <RecentPostCard {post} />
    {/each}
  </div>
</div>

{#if data.isSelf}
  <EditProfileModal bind:pronouns={data.pronouns} bind:bio={data.bio} bind:show={showEditModal} bind:avatarUrl />
{/if}
