<script lang="ts">
  import Fa from 'svelte-fa';
  import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
  import { browser } from '$app/environment';
  import Sidebar from './Sidebar.svelte';

  let searchBar: HTMLInputElement;

  if (browser) {
    // listen to '/' being pressed and focus searchBar
    window.addEventListener('keydown', (e) => {
      if (e.target?.tagName === 'BODY' && e.key === '/') {
        e.preventDefault();
        searchBar.focus();
      }
    });
  }

  let showSidebar = false;
</script>

<div
  class="mb-4 flex-1 flex flex-nowrap items-center border-b bg-neutral-200 border-neutral-300 dark:border-b-black dark:bg-neutral-800 p-2">
  <button class="p-3 pr-5 transition rounded-md sm:hidden" on:click={() => showSidebar = true}>
    <Fa icon={faBars} size="lg" />
  </button>
  <input type="text"
    bind:this={searchBar}
    placeholder="Search..."
    class="bg-neutral-100 flex flex-1 w-1 min-w-0 dark:bg-black text-lg p-2 border-good-grey rounded-md mr-2"
  >
  <button class="p-3 bg-neutral-500 hover:bg-neutral-600 transition rounded-md text-white">
    <Fa icon={faMagnifyingGlass} size="lg" />
  </button>
</div>

<div class="contents sm-hidden">
  <div class="z-10 fixed inset-0 flex flex-row" class:hidden={!showSidebar}>
    <div class="absolute inset-0 bg-black transition delay-75" class:opacity-50={showSidebar} class:opacity-100={!showSidebar}></div>
    <div class="relative" class:sidebarVisible={showSidebar} class:sidebarHidden={!showSidebar}>
      <Sidebar closeButton={true} bind:sidebarOpen={showSidebar} />
    </div>
  </div>
</div>
