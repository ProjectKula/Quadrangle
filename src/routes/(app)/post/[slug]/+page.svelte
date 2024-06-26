<script lang="ts">
  import RecentPostCard from "$lib/components/posts/RecentPostCard.svelte";
  import type { Post } from "$lib/graphql/post";

  export let data: Post
</script>

<RecentPostCard post={data} />
