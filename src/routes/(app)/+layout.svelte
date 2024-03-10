<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Fa from 'svelte-fa';
  import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
  import { browser } from '$app/environment';

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
</script>

<div class="flex flex-row flex-1 min-h-screen">
    <Sidebar />
    <div class="flex-1">
      <div
        class="mb-4 flex-1 flex flex-nowrap items-center border-b bg-neutral-200 border-neutral-300 dark:border-b-black dark:bg-neutral-800 p-2">
        <input type="text"
               bind:this={searchBar}
               placeholder="Search..."
               class="bg-neutral-100 flex flex-1 w-1 min-w-0 dark:bg-black text-lg p-2 border-good-grey rounded-md mr-2"
        >
        <button class="p-3 bg-neutral-500 hover:bg-neutral-600 transition rounded-md text-white">
          <Fa icon={faMagnifyingGlass} size="lg" />
        </button>
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
    
    <Footer />
</div>
