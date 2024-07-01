<script lang="ts">
  import { fade } from 'svelte/transition';
  import Fa from 'svelte-fa';
  import { faMultiply } from '@fortawesome/free-solid-svg-icons';

  export let message: string;
  export let onClose: () => void;
  export let onHover: () => void;
  export let onUnhover: () => void;
  
  let isHovering = false;
  
  function onMouseEnter() {
    if (!isHovering) {
      isHovering = true;
      onHover();
    }
  }
  
  function onMouseLeave() {
    isHovering = false;
    onUnhover()
  }
</script>

<div
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  role="banner"
  transition:fade 
  class="drop-shadow-md fade-banner fixed top-0 left-0 right-0 bg-green-500 dark:text-white text-black rounded-lg m-2 p-2 flex items-center justify-between">
  <span class="px-4"></span>
  <span>{message}</span>
  <button on:click={onClose} class="text-white">
    <Fa size={"lg"} icon={faMultiply}  />
  </button>
</div>
