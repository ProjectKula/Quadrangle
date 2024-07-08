<script lang="ts">
  import SmallUserProfile from '$lib/components/user/SmallUserProfile.svelte';
  import ConfessionPane from '$lib/components/confessions/ConfessionPane.svelte';
  import RecentPostCard from '$lib/components/posts/RecentPostCard.svelte';
  import type { Confession } from '$lib/graphql/confessions/confessions';
  import type { RecentPost } from '$lib/graphql/post/recentPosts';
  import type { SearchResult } from '$lib/graphql/search';
  import type { User } from '$lib/graphql/user/user';

  export let data: { data: [SearchResult], query: string };
  let searchResults: [SearchResult] = data.data;

  function asUser(result: SearchResult): User {
    return result as unknown as User;
  }

  function asPost(result: SearchResult): RecentPost {
    return result as unknown as RecentPost;
  }

  function asConfession(result: SearchResult): Confession {
    return result as unknown as Confession;
  }
</script>

<svelte:head>
  <title>Results for {data.query}</title>
</svelte:head>

<div class="flex flex-col gap-4 items-center">
  {#each searchResults as result}
    <div class="flex bg-neutral-200 p-4 rounded-lg dark:bg-neutral-800 w-full">
      {#if result.__typename == 'Post'}
        <RecentPostCard post={asPost(result)}/>
      {:else if result.__typename == 'RegisteredUser'}
        <SmallUserProfile data={asUser(result)} linked={true} />
      {:else if result.__typename == 'Confession'}
        <ConfessionPane confession={asConfession(result)}/>
      {:else}
        Bruh what type is {result.__typename}
      {/if}
    </div>
  {/each}

  {#if !searchResults.length}
    <h1>No results!</h1>
  {/if}
</div>
