<script lang="ts">
  import { Post } from "$lib/graphql/post";
  import { RecentPost } from "$lib/graphql/post/recentPosts";
  import { faMultiply } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import { quintOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  export let display = false;
  export let post: RecentPost | Post;
  $: likesCount = post.likesCount;
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center transition">
  <button transition:fade={{ duration: 150 }} on:click={() => (display = false)} class="cursor-default absolute inset-0 bg-black opacity-50"></button>
  <div transition:fly={{ delay: 0, duration: 200, x: 0, y: 500, easing: quintOut }} class="relative bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-md max-h-96 overflow-scroll m-4">
    <button class="absolute top-0 right-0 p-2 hover:text-neutral-600 transition" on:click={() => (display = false)}>
      <Fa size={'lg'} icon={faMultiply} />
    </button>
  </div>
</div>
