<script lang="ts">
  import { browser } from '$app/environment';
  import { getAuthTokenClient } from '$lib/auth';
  import { getNotifs, Notification } from '$lib/graphql/user/notifs';
  import { onMount } from 'svelte';
  import Spinner from '../util/Spinner.svelte';
  import { quintOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';

  let notifications: Notification[] = [];
  let loading = true;
  let display = false;

  if (browser) {
    onMount(async () => {
      const res = getNotifs(getAuthTokenClient());
      notifications = await res;
      loading = false;
    });
  }

  function onClick() {
    display = true;
  }
</script>

<button class="flex flex-row" on:click={onClick}>
  {#if loading}
    <Spinner />
  {:else if notifications.length > 0}
    <span class="text-sm">{notifications.length} Notification{notifications.length != 1 ? 's' : ''}</span>
  {:else}
    <span class="text-sm">No Notifications</span>
  {/if}
</button>

{#if !loading && display}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button transition:fade={{ duration: 150 }} on:click={() => (display = false)} class="cursor-default absolute inset-0 bg-black opacity-50"></button>
    <div transition:fly={{ delay: 0, duration: 200, x: 0, y: 500, easing: quintOut }} class="relative bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-md">
      
    </div>
  </div>
{/if}
