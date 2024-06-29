<script lang="ts">
  import RecentPostCard from '$lib/components/posts/RecentPostCard.svelte';
  import type { Post } from '$lib/graphql/post';

  export let data: Post;
</script>

<svelte:head>
  <title>Post by {data.creator.name}</title>
</svelte:head>

<div class="flex w-full justify-center">
  <div class="flex flex-col gap-2 w-full max-w-screen-sm">
    <RecentPostCard post={data} />
  </div>
</div>
