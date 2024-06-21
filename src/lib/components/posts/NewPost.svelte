<script lang="ts">
  import autosize from 'svelte-autosize';
  import { createNewPost } from '$lib/graphql/post/newPost';
  import { getAuthTokenClient } from '$lib/auth';
  import PaperclipIcon from '$lib/components/icon/PaperclipIcon.svelte';
  import ItalicIcon from '$lib/components/icon/ItalicIcon.svelte';
  import ErrorBanner from '$lib/components/banner/ErrorBanner.svelte';
  import AttachmentIcon from '$lib/components/posts/AttachmentIcon.svelte';
  import BoldIcon from '../icon/BoldIcon.svelte';
  import StrikethroughIcon from '../icon/StrikethroughIcon.svelte';
  import { fade } from 'svelte/transition';

  let postText = '';
  let isSubmitVisible = false;
  let submitting = false;
  $: isDragging = false;
  let textarea: HTMLTextAreaElement;
  let attachments: File[] = [];

  function performBold(e) {
    let selection = postText.substring(textarea.selectionStart, textarea.selectionEnd);
    let bolded = `**${selection}**`;
    postText = postText.substring(0, textarea.selectionStart) + bolded + postText.substring(textarea.selectionEnd);
    e.preventDefault();
    e.stopPropagation();
  }

  function performItalic(e) {
    let selection = postText.substring(textarea.selectionStart, textarea.selectionEnd);
    let italicized = `*${selection}*`;
    postText = postText.substring(0, textarea.selectionStart) + italicized + postText.substring(textarea.selectionEnd);
    e.preventDefault();
    e.stopPropagation();
  }

  function performStrikethrough(e) {
    let selection = postText.substring(textarea.selectionStart, textarea.selectionEnd);
    let strikethrough = `~~${selection}~~`;
    postText = postText.substring(0, textarea.selectionStart) + strikethrough + postText.substring(textarea.selectionEnd);
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragEnter(e) {
    e.preventDefault();
    if (isDragging) {
      return;
    }
    console.log('start');
    isDragging = true;
    textarea.classList.add('draggedTextArea');
    textarea.focus({ preventScroll: false });
  }

  function handleDragLeave(e) {
    console.log('end');
    isDragging = false;
    textarea.classList.remove('draggedTextArea');
  }

  let timeout: never;
  let errorMessage: string = '';

  function handleDrop(e) {
    console.log('drop');
    isDragging = false;

    if (e.dataTransfer.items[0]?.kind === 'file') {
      let item: DataTransferItem = e.dataTransfer.items[0];
      e.preventDefault();
      addFile(item.getAsFile()!);
    }
  }

  let fileInput: HTMLInputElement;

  function handleUpload() {
    if (fileInput.files && fileInput.files[0]) {
      addFile(fileInput.files[0]);
    }
  }

  function addFile(file: File) {
    let acceptedImageTypes: string[] = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    if (acceptedImageTypes.includes(file.type)) {
      if (file.size > 1024 * 1024 * 8) {
        errorBanner('Maximum file size is 8MB');
        return;
      } else if (attachments.length >= 4) {
        errorBanner('Maximum of 4 attachments');
        return;
      }
      // postText = file.type + ' AND ' + file.name;
      attachments.push(file);
      attachments = attachments;
    } else {
      errorBanner('Please upload an image');
    }
  }

  function errorBanner(message: string) {
    errorMessage = message;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      errorMessage = '';
    }, 2000);
  }

  function handleSubmit() {
    let newPostText = postText.trim();
    if (postText.length === 0) {
      return;
    }
    console.log('Submitting post:', newPostText);
    submitting = true;
    createNewPost(getAuthTokenClient(), newPostText, attachments)
      .then((newPost) => {
        if (newPost && newPost.id) {
          console.log('Created a new post:', newPost.id);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          alert('Failed to create a new post');
        }
      })
      .catch((err) => {
        alert('Error creating a new post');
        console.log(err);
      })
      .finally(() => {
        submitting = true;
      });
  }

  function deleteAttachment(index: number) {
    attachments.splice(index, 1);
    attachments = attachments;
  }
</script>

{#if errorMessage}
  <div transition:fade class="transition">
    <ErrorBanner
      {errorMessage}
      onClose={() => (errorMessage = '')}
      onHover={() => {
        if (timeout) clearTimeout(timeout);
      }}
      onUnhover={() =>
        (timeout = setTimeout(() => {
          errorMessage = '';
        }, 1000))}
    />
  </div>
{/if}

<div class="flex flex-col items-stretch w-full mx-auto mb-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl border-0 p-2 border-neutral-500 gap-2">
  <div class="flex flex-row items-center p-1 gap-1">
    <span class="flex-1"></span>
    <button on:click={performBold} class="p-1 rounded-md transition hover:dark:bg-neutral-700 hover:bg-neutral-300"><BoldIcon /></button>
    <button on:click={performItalic} class="p-1 rounded-md transition hover:dark:bg-neutral-700 hover:bg-neutral-300"><ItalicIcon /></button>
    <button on:click={performStrikethrough} class="p-1 rounded-md transition hover:dark:bg-neutral-700 hover:bg-neutral-300"><StrikethroughIcon /></button>
    <span class="h-6 border-r mx-2"></span>
    <label for="attachment-input">
      <div role="button" class="p-1 rounded-md transition hover:dark:bg-neutral-700 hover:bg-neutral-300"><PaperclipIcon /></div>
    </label>
    <input bind:this={fileInput} type="file" id="attachment-input" class="hidden" on:change={handleUpload} />
  </div>

  <textarea
    bind:value={postText}
    bind:this={textarea}
    on:input={() => (isSubmitVisible = postText.length > 0)}
    on:dragover={handleDragEnter}
    on:drop={handleDrop}
    on:dragleave={handleDragLeave}
    placeholder={isDragging ? 'Drop your files here' : 'Write something here...'}
    disabled={submitting}
    use:autosize
    rows="4"
    id="new-post-textarea"
    class="w-full max-h-128 border-2 rounded-xl border-neutral-200 dark:border-good-dark-grey p-2 bg-neutral-100 dark:bg-neutral-800 text-base rounded resize-none"
    class:bg-neutral-200={isDragging}
    class:dark:bg-neutral-700={isDragging}
  ></textarea>

  <div class="flex flex-row justify-end gap-2 transition fade-in-buttons">
    <button on:click={handleSubmit} class="btn-success px-8 py-1 text-white" disabled={!isSubmitVisible || submitting}>Submit</button>
  </div>

  {#if attachments.length > 0}
    <div class="flex flex-row max-md:flex-col gap-2">
      {#each attachments as attachment, index}
        <AttachmentIcon file={attachment} onDelete={() => deleteAttachment(index)} />
      {/each}
    </div>
  {/if}
</div>
