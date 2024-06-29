<script lang="ts">
  import { browser } from '$app/environment';
  import { getAuthTokenClient } from '$lib/auth';
  import { getNotifs } from '$lib/graphql/user/notifs';
  import { onMount } from 'svelte';
  import Spinner from '../util/Spinner.svelte';
  import { quintOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import Fa from 'svelte-fa';
  import { faMultiply } from '@fortawesome/free-solid-svg-icons';
  import { formatRelativeDate } from '$lib';

  interface ReferencePost {
    id: string;
  }
  interface ReferenceUser {
    id: number;
    name: string;
    avatarHash: string;
  }
  interface Notification {
    id: string;
    createdAt: number; // seconds since epoch
    type: 'follow' | 'like' | 'comment' | 'mention';
    referencePost: ReferencePost;
    referenceUser: ReferenceUser;
  }

  let notifications: Notification[] = [];
  let loading = true;
  let display = false;
  export let closeCallback = () => {};

  if (browser) {
    onMount(async () => {
      const res = getNotifs(getAuthTokenClient());
      notifications = await res;
      notifications.sort((a, b) => b.createdAt - a.createdAt);
      loading = false;
    });
  }

  function formatDate(date: number): string {
    const d = new Date(date * 1000);
    let dateStr = d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    let timeStr = d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${dateStr}, ${timeStr}`;
  }

  function onClick() {
    display = true;
  }

  function onLink() {
    display = false;
    closeCallback();
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
    <div transition:fly={{ delay: 0, duration: 200, x: 0, y: 500, easing: quintOut }} class="relative bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-md max-h-96 overflow-scroll m-4">
      <button class="absolute top-0 right-0 p-2 hover:text-neutral-600 transition" on:click={() => (display = false)}>
        <Fa size={'lg'} icon={faMultiply} />
      </button>
      {#if notifications.length == 0}
        <span class="text-lg">No Notifications!</span>
      {/if}
      <div class="flex flex-col gap-2">
        {#each notifications as notif}
          <div class="flex flex-col">
            <span class="text-md flex flex-row gap-2 items-center">
              <span class="text-xs">{formatRelativeDate(notif.createdAt)}</span>
              <span>
                {#if notif.type == 'follow'}
                  <a on:click={onLink} class="hoverBlue" href="/user/{notif.referenceUser.id}">{notif.referenceUser.name}</a> followed you
                {:else if notif.type == 'like'}
                  <a on:click={onLink} class="hoverBlue" href="/user/{notif.referenceUser.id}">{notif.referenceUser.name}</a> liked your
                  <a on:click={onLink} class="hoverBlue" href="/post/{notif.referencePost.id}">post</a>
                {/if}
              </span>
            </span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
