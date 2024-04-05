<script lang="ts">
  import autosize from 'svelte-autosize';
  import ConfessionsGallery from "$lib/components/confessions/ConfessionsGallery.svelte";
  import type { ConfessionsPage } from "$lib/graphql/confessions";
  import { faMultiply } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";

  export let data: ConfessionsPage;

  let isConfessing: boolean = false;
  let confessionText: string = "";
  let submitting: boolean = false;

  function handleInputChange() {

  }
</script>

<div class="flex flex-col">
  <div class="flex flex-row gap-5 items-center mb-4">
    <h1 class="font-semibold text-3xl">Confessions</h1>
  </div>

  <div class="flex flex-row gap-5">
    <div class="flex flex-row-reverse">
      <button class="btn-success px-2 py-1 mb-4" on:click={() => isConfessing = true}>Post Confession</button>
    </div>
  </div>

  <ConfessionsGallery confessions={data} />
</div>

{#if isConfessing}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="flex flex-col gap-2 relative bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-md">
      <button class="absolute top-0 right-0 p-2 hover:text-neutral-600 transition" on:click={() => isConfessing = false}>
        <Fa size={"lg"} icon={faMultiply} />
      </button>
      <h1 class="font-semibold text-xl">New confession</h1>
      <textarea
        bind:value={confessionText}
        on:input={handleInputChange}
        placeholder="Speak your mind..."
        disabled={submitting}
        use:autosize
        rows="3"
        class="max-h-24 border-4 border-neutral-200 dark:border-good-dark-grey mb-4 p-2 bg-neutral-100 dark:bg-neutral-800 text-base rounded resize-none"
      ></textarea>
      <div class="flex flex-row-reverse">
        <button class="btn-success px-2 py-1" on:click={() => isConfessing = true}>Post Confession</button>
      </div>
    </div>
  </div>
{/if}
