<script lang="ts">
  import type { Confession } from "$lib/graphql/confessions/confessions";

  export let confession: Confession
  export let maxLength: number = 200

  const date = new Date(confession.createdAt * 1000);
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  let truncatedContent = confession.content.slice(0, maxLength);
  if (truncatedContent.length < confession.content.length) {
    truncatedContent += '...';
  }
</script>

<div class="flex flex-col p-4 dark:bg-neutral-800 bg-neutral-200 rounded shadow">
  <h1 class="text-2xl font-semibold">#{confession.id}</h1>

  <p class="overflow-y-auto">{truncatedContent}</p>

  <span class="flex-1"></span>

  <div class="flex justify-between mt-4">
    <span class="text-sm text-neutral-500">{dateStr} at {timeStr}</span>
  </div>
</div>
