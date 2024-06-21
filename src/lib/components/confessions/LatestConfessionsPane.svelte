<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthTokenClient } from "$lib/auth";
  import { latestConfession, type Confession } from "$lib/graphql/confessions/confessions";
  import { onMount } from "svelte";
  import ConfessionPane from "./ConfessionPane.svelte";

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
          month: 'long',
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
  <div class="flex flex-col items-center justify-center">
    {#if confession}
      <ConfessionPane maxLength={100} confession={confession} />
    {:else if loaded}
      <p>No confessions yet!</p>
    {:else if !loaded}
      <p>Loading...</p>
    {/if}
  </div> 
</a>
