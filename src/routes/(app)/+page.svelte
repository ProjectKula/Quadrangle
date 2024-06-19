<script lang="ts">
  import NewPost from '$lib/components/posts/NewPost.svelte';
  import RecentPostCard from '$lib/components/posts/RecentPostCard.svelte';
  import type { RecentPost } from '$lib/graphql/post/recentPosts';
  
  export let data: { data: RecentPost[] };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="flex flex-col w-full items-center">
  <div class="flex flex-row mb-2 flex-1 w-full max-w-screen-sm">
    <NewPost />
  </div>

  <div class="flex flex-col gap-4 flex-1 w-full max-w-screen-sm">
    {#each data.data as post}
      <RecentPostCard {post} />
    {/each}
  </div>
</div>
