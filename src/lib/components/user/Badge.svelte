<script lang="ts">
  import { fade } from 'svelte/transition';
  import AdminBadgeIcon from '../icon/badge/AdminBadgeIcon.svelte';
  import DeveloperBadgeIcon from '../icon/badge/DeveloperBadgeIcon.svelte';

  let hovered: boolean = false;

  export let type: string;

  let tooltipText: string;
  switch (type) {
    case 'admin':
      tooltipText = 'Admin';
      break;
    case 'developer':
      tooltipText = 'Developer';
      break;
    default:
      tooltipText = 'Unknown';
  }
</script>

<button class="relative" on:mouseenter={() => (hovered = true)} on:mouseleave={() => (hovered = false)}>
  {#if type == 'admin'}
    <span class="text-red-500"><AdminBadgeIcon /></span>
  {:else if type == 'developer'}
    <span class="text-blue-500"><DeveloperBadgeIcon /></span>
  {/if}

  {#if hovered}
    <div transition:fade class="tooltip text-center absolute bg-black text-white p-1 rounded-lg text-xs">
      {tooltipText}
    </div>
  {/if}
</button>

<style>
  .tooltip {
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
</style>
