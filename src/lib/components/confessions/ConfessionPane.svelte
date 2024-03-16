<script lang="ts">
  import type { Confession } from "$lib/graphql/confessions";

  export let confession: Confession

  const date = new Date(confession.createdAt * 1000);
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
</script>

<div class="flex flex-col p-4 dark:bg-neutral-800 bg-neutral-300 rounded shadow">
  <h1 class="text-2xl font-semibold">Confession #{confession.id}</h1>

  <p>{confession.content}</p>

  <div class="flex justify-between mt-4">
    <span class="text-sm">{confession.createdAt}</span>
  </div>

  <div class="flex justify-between mt-4">
    <span class="text-sm text-neutral-500">{dateStr} at {timeStr}</span>
  </div>
</div>
