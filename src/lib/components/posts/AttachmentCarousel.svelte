<script lang="ts">
  import Fa from 'svelte-fa';
  import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
  import { PUBLIC_BUCKET_URL } from '$env/static/public';
  import { slide } from 'svelte/transition';
	
  export let attachments: string[]; // Array of attachment URLs

  let currentAttachmentIndex = 0;

  $: attachmentUrl = `${PUBLIC_BUCKET_URL}/${attachments[currentAttachmentIndex]}`;

  function nextAttachment() {
    currentAttachmentIndex = (currentAttachmentIndex + 1) % attachments.length;
  }

  function prevAttachment() {
    currentAttachmentIndex = (currentAttachmentIndex - 1 + attachments.length) % attachments.length;
  }
</script>

{#if attachments.length > 0}
  <div role="image" class="w-full max-h-100">
    <div class="relative w-full h-full">
      {#each [attachments[currentAttachmentIndex]] as attachment (currentAttachmentIndex)}
        <img transition:slide src={`${PUBLIC_BUCKET_URL}/${attachment}`} alt="Attachment" class="w-full h-full object-contain" />
        {#if attachments.length != 1}
          <div class="absolute top-0 left-0 w-full h-full flex items-center justify-between">
            <button class="p-2 bg-black bg-opacity-50 text-white" on:click|preventDefault|stopPropagation={prevAttachment}>
              <Fa icon={faAngleLeft} class="text-2xl" />
            </button>
            <button class="p-2 bg-black bg-opacity-50 text-white" on:click|preventDefault|stopPropagation={nextAttachment}>
              <Fa icon={faAngleRight} class="text-2xl" />
            </button>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{/if}
