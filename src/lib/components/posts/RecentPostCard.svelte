<script lang="ts">
  import type { RecentPost } from '$lib/graphql/post/recentPosts';
  import Fa from 'svelte-fa';
  import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
  import { faHeart } from '@fortawesome/free-regular-svg-icons';
  import { getLikesPage, likePost, unlikePost } from '$lib/graphql/post/like';
  import { getAuthTokenClient } from '$lib/auth';
  import AttachmentCarousel from './AttachmentCarousel.svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import type { Post } from '$lib/graphql/post';
  import { formatRelativeDate } from '$lib';
  import LazyUserListModal from './LazyUserListModal.svelte';

  export let post: RecentPost | Post;

  let likesCount = post.likesCount;

  let selfLiked = post.selfLiked;
  let loading = false;
  let likesVisible = false;

  let date = new Date(post.createdAt * 1000);
  let dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  let timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  function onLike() {
    loading = true;
    likePost(post.id, getAuthTokenClient())
      .then((res) => {
        likesCount = res;
        selfLiked = true;
      })
      .finally(() => {
        loading = false;
      });
  }

  function onUnlike() {
    loading = true;
    unlikePost(post.id, getAuthTokenClient())
      .then((res) => {
        likesCount = res;
        selfLiked = false;
      })
      .finally(() => {
        loading = false;
      });
  }
</script>

<div class="cursor-auto flex flex-col flex-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-2" s>
  <div class="flex flex-row flex-shrink font-light gap-2 text-sm">
    <a class="text-lg dark:text-blue-400 dark:hover:text-blue-500 text-blue-500 hover:text-blue-600 transition" href="/user/{post.creator.id}">{post.creator.name}</a>
    <span class="flex-1"></span>
    <a href="/post/{post.id}/" class="text-lg">{formatRelativeDate(post.createdAt)}</a>
  </div>

  <AttachmentCarousel attachments={post.attachments} />

  <div class="min-width-0 text-lg">
    <SvelteMarkdown source={post.content} />
  </div>

  <p class="flex flex-row gap-4 pl-1">
    {#if selfLiked}
      <button class="text-red" on:click|preventDefault|stopPropagation={onUnlike}>
        <Fa icon={faHeartSolid} color="red" />
      </button>
    {:else}
      <button class="hover:text-red transition duration-100" on:click|preventDefault|stopPropagation={onLike}>
        <Fa icon={faHeart} />
      </button>
    {/if}
    <button on:click={() => (likesVisible = !likesVisible)}>
      {likesCount} Like{likesCount === 1 ? '' : 's'}
    </button>
  </p>
</div>

{#if likesVisible}
  <LazyUserListModal getPage={(num) => getLikesPage(post.id, 5, num, getAuthTokenClient())} totalCount={post.likesCount} heading="Likes" bind:display={likesVisible} />
{/if}
