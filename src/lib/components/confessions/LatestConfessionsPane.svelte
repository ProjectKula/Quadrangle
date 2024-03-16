<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthTokenClient } from "$lib/auth/auth";
  import { latestConfession, type Confession } from "$lib/graphql/confessions";
  import { onMount } from "svelte";

  let confession: Confession | undefined = undefined;
  let loaded = false;

  let date: Date
  let dateStr: string
  let timeStr: string

  if (browser) {
    onMount(async () => {
      confession = await latestConfession(getAuthTokenClient());
      loaded = true;
      if (confession) {
        date = new Date(confession.createdAt * 1000);
        dateStr = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        timeStr = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    });
  }
</script>

<a href="/confess" title="Go to the confessions page">
  <div class="h-60 flex flex-col items-center justify-center">
    {#if confession}
      <h1 class="text-2xl font-bold">Confession {confession.id}</h1>
      <p class="text-sm">{dateStr} at {timeStr}</p>
      <p class="text-sm">{confession.content}</p>
    {:else if loaded}
      <p>No confessions yet!</p>
    {:else if !loaded}
      <p>Loading...</p>
    {/if}
  </div> 
</a>
