<script lang="ts">
  import type { Confession } from '$lib/graphql/confessions/confessions';
  import ConfessionPane from '$lib/components/confessions/ConfessionPane.svelte';
  import Fa from 'svelte-fa';
  import { faAngleRight, faAngleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

  export let data: Confession;

  $: error = !data.createdAt;
  $: positive = data.id > 1;
</script>


<a href="/confess" class="flex gap-2 items-center hoverBlue">
  <Fa icon={faArrowLeft} />
  <span>Back to Confessions</span>
</a>
{#key data}
  {#if !error}
    <div class="flex flex-col gap-4">
      <ConfessionPane confession={data} maxLength={1000} link={false} />

      <div class="flex flex-row justify-between">
        {#if data.id > 1}
          <a href="/confession/{data.id - 1}" class="flex gap-2 items-center hoverBlue">
            <Fa icon={faAngleLeft} />
            <span>Previous</span>
          </a>
        {:else}
          <span class="flex-1"></span>
        {/if}

        <a href="/confession/{data.id + 1}" class="flex gap-2 items-center hoverBlue">
          <span>Next</span>
          <Fa icon={faAngleRight} />
        </a>
      </div>
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center gap-4">
      <h1>That confession doesn't exist!</h1>
      {#if positive}
        <p>It's possible that the confession you're looking for hasn't been posted yet. If you'd like to be the first to post it, you can do so by clicking the button below.</p>
      {/if}
      <div class="flex flex-row justify-between w-full">
        {#if positive}
          <a href="/confession/{data.id - 1}" class="flex gap-2 items-center hoverBlue">
            <Fa icon={faAngleLeft} />
            <span>Previous</span>
          </a>
        {/if}

        <a href="/confess" class="flex gap-2 items-center hoverBlue">
          <span>New Confession</span>
        </a>

        {#if !positive}
          <a href="/confession/{data.id + 1}" class="flex gap-2 items-center hoverBlue">
            <span>Next</span>
            <Fa icon={faAngleRight} />
          </a>
        {/if}
      </div>
    </div>
  {/if}
{/key}
