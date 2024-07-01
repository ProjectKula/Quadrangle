<script lang="ts">
  import { browser } from '$app/environment';
  import { faMultiply } from '@fortawesome/free-solid-svg-icons';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';
  import { quintOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import Spinner from '../util/Spinner.svelte';
  import PetitUserProfile from '../user/PetitUserProfile.svelte';

  let likeUsers: {
    id: number;
    name: string;
    avatarHash: string;
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

  export let getPage: (page: number) => Promise<{ items: { id: number, name: string, avatarHash: string}[], metadata: { page: number, per: number, pageCount: number, total: number } }>;
  export let totalCount: number;
  export let heading: string;
  export let display = false;

  async function addNewLikes() {
    if (fetching) return;
    if (moreLikes) {
      fetching = true;
      const likesPage = await getPage(pageNumber);
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
      <h1 class="text-left w-full text-xl mb-4 font-semibold">{heading}</h1>
      {#if loading}
        <Spinner />
      {:else if totalCount === 0}
        <p class="text-center text-neutral-500 dark:text-neutral-400">None yet</p>
      {:else}
        {#each likeUsers as user}
          <PetitUserProfile user={user} />
        {/each}

        {#if moreLikes}
          <Spinner />
        {/if}
      {/if}
      <span bind:this={scrollTarget} />
    </div>
  </div>
</div>
