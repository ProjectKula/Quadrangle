<script lang="ts">
  import { fade } from 'svelte/transition';
  import Fa from 'svelte-fa';
  import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
  import { faMultiply } from '@fortawesome/free-solid-svg-icons';

  export let errorMessage: string;
  export let closeCallback: () => void;
  export let holdCallback: () => void;
  export let restartCallback: () => void;
  
  let isHovering = false;
  
  function onHover() {
    if (!isHovering) {
      isHovering = true;
      holdCallback();
    }
  }
  
  function onHoverEnd() {
    isHovering = false;
    restartCallback()
  }
</script>

<div
  on:mouseenter={onHover}
  on:mouseleave={onHoverEnd}
  role="banner"
  transition:fade 
  class="fade-banner fixed top-0 left-0 right-0 bg-red-500 text-white rounded-lg m-2 p-2 flex items-center justify-between">
  <span class="px-4"></span>
  <span>{errorMessage}</span>
  <button on:click={closeCallback} class="text-white">
    <Fa size={"lg"} icon={faMultiply}  />
  </button>
</div>
