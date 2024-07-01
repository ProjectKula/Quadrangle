<script lang="ts">
  import { browser } from '$app/environment';
  import { getAuthTokenClient } from '$lib/auth';
  import { getLikesPage } from '$lib/graphql/post/like';
  import { faMultiply } from '@fortawesome/free-solid-svg-icons';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';
  import { quintOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import Spinner from '../util/Spinner.svelte';
  import { PUBLIC_BUCKET_URL } from '$env/static/public';

  interface RecentPost {
    id: string;
    content: string;
    createdAt: number;
    likesCount: number;
    creator: {
      id: number;
      name: number;
    };
    selfLiked: boolean;
    attachments: string[];
  }

  export let display = false;
  export let post: RecentPost;
  $: likesCount = post.likesCount;

  let likeUsers: {
    id: number;
    name: string;
    avatarHash: string;
    isSelf: boolean;
  }[] = [];
  let fetching = false;
  let loading = true;
  let pageNumber = 1;
  let moreLikes = true;

  let scrollTarget: HTMLSpanElement;

  if (browser) {
    onMount(() => {
      addNewLikes().then(() => {
        loading = false;
      });

      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addNewLikes();
          }
        });
      });
      observer.observe(scrollTarget);
      return () => {
        observer.unobserve(scrollTarget);
      };
    });
  }

  function getAvatarUrl(hash: string | null) {
    if (hash) {
      return `${PUBLIC_BUCKET_URL}/${hash}`;
    } else {
      return '/default_pfp.svg';
    }
  }

  async function addNewLikes() {
    if (fetching) return;
    if (moreLikes) {
      fetching = true;
      const likesPage = await getLikesPage(post.id, 5, pageNumber, getAuthTokenClient());
      likeUsers = [...likeUsers, ...likesPage.items];
      moreLikes = likeUsers.length < likesPage.metadata.total;
      pageNumber++;
      fetching = false;
    }
  }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center transition">
  <button transition:fade={{ duration: 150 }} on:click={() => (display = false)} class="cursor-default absolute inset-0 bg-black opacity-50"></button>
  <div transition:fly={{ delay: 0, duration: 200, x: 0, y: 500, easing: quintOut }} class="relative bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-md min-h-60 max-h-96 overflow-scroll m-4">
    <button class="absolute top-0 right-0 p-2 hover:text-neutral-600 transition" on:click={() => (display = false)}>
      <Fa size={'lg'} icon={faMultiply} />
    </button>

    <div class="flex flex-col items-center justify-center gap-4">
      <h1 class="text-left w-full text-xl mb-4 font-semibold">Likes</h1>
      {#if loading}
        <Spinner />
      {:else if likesCount === 0}
        <p class="text-center text-neutral-500 dark:text-neutral-400">No likes yet</p>
      {:else}
        {#each likeUsers as likeUser}
          <div class="flex w-full items-center space-x-2">
            <img class="w-8 h-8 rounded-full" src={getAvatarUrl(likeUser.avatarHash)} alt={likeUser.name} />

            <a class="hoverBlue" href="/user/{likeUser.id}">{likeUser.name}</a>
          </div>
        {/each}

        {#if moreLikes}
          <Spinner />
        {/if}

        <!-- Add an element here that once scrolled to, calls the addNewLikes function -->
      {/if}
      <span bind:this={scrollTarget} />
    </div>
  </div>
</div>
