<script lang="ts">
  import { faMultiply, faSpinner } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  export let file: File;

  let imageUrl: string | undefined;
  let showModal = false;

  const renderFileAsImage = async () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      imageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  };

  $: renderFileAsImage();
</script>

<style>
  .spinner {
    animation: spin 1s linear infinite;
  }

  .hidden-modal {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s ease-out;
  }

  .visible-modal {
    visibility: visible;
    opacity: 1;
  }
</style>

<button on:click={() => { showModal = true; }} class="p-1 rounded-md transition dark:bg-neutral-700 hover:dark:bg-neutral-800 bg-neutral-200 hover:bg-neutral-300">
  {#if imageUrl}
    <img src={imageUrl} alt="Attachment" class="w-6 h-6 object-contain"/>
  {:else}
    <!-- TODO use the Spinner component I created -->
    <span class="spinner">
      <Fa size={"lg"} icon={faSpinner}  />
    </span>
  {/if}
</button>

{#if showModal}
  <div class:hidden-modal={!showModal} class:visible-modal={showModal} class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button class="absolute inset-0 bg-black opacity-50" on:click={() => showModal = false}></button>
    <div class="relative  rounded-lg p-8 max-w-md">
      <button class="absolute top-0 right-0 p-2 hover:text-neutral-600 transition" on:click={() => { showModal = false; }}>
        <Fa size={"lg"} icon={faMultiply} />
      </button>

      <div class="flex flex-col gap-4 justify-center items-center">
        <img src={imageUrl} alt="Attachment" class="object-contain" />
        <button class="btn-cancel px-2 py-1 ">Delete</button>
      </div>
    </div>
  </div>
{/if}
