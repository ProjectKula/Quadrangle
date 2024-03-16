<script lang="ts">
  import type { ConfessionsPage } from "$lib/graphql/confessions";
  import ConfessionPane from "./ConfessionPane.svelte";
  
  export let confessions: ConfessionsPage
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {#each confessions.items as confession}
    <ConfessionPane confession={confession} />
  {/each}
</div>
