<script lang="ts">
  import autosize from 'svelte-autosize';
  import { createNewPost } from '$lib/graphql/post/newPost';
  import { getAuthTokenClient } from '$lib/auth';
  import PaperclipIcon from '$lib/components/icon/PaperclipIcon.svelte';
  import ErrorBanner from '$lib/components/banner/ErrorBanner.svelte';
  import AttachmentIcon from '$lib/components/posts/AttachmentIcon.svelte';

  let postText = '';
  let isSubmitVisible = false;
  let submitting = false;
  $:isDragging = false;
  let textarea: HTMLTextAreaElement;
  let attachments: File[] = [];
  
  function handleDragEnter(e) {
    e.preventDefault()
    if (isDragging) {
      return;
    }
    console.log("start")
    isDragging = true;
    textarea.classList.add('draggedTextArea');
    textarea.focus({ preventScroll: false });
  }
  
  function handleDragLeave(e) {
    console.log("end")
    isDragging = false;
    textarea.classList.remove('draggedTextArea')
  }
  
  let timeout: never;
  let errorMessage: string = "";
  
  function handleDrop(e) {
    console.log("drop")
    isDragging = false;
    
    if (e.dataTransfer.items[0]?.kind === 'file') {
      let item: DataTransferItem = e.dataTransfer.items[0];
      let file: File = item.getAsFile()!;
      let acceptedImageTypes: string[] = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
      if (acceptedImageTypes.includes(file.type)) {
        if (file.size > 1024 * 1024 * 8) {
          errorBanner("Maximum file size is 8MB");
          return;
        } else if (attachments.length >= 4) {
          errorBanner("Maximum of 4 attachments");
          return;
        }
        postText = file.type + ' AND ' + file.name;
        attachments.push(file);
        attachments = attachments;
        e.preventDefault();
      } else {
        errorBanner("Please upload an image");
      }
    }
  }

  function errorBanner(message: string) {
    errorMessage = message;
    clearTimeout(timeout);
    timeout = setTimeout(() => { errorMessage = ""; }, 2000);
  }

  function handleInputChange() {
    isSubmitVisible = postText.length > 0;
  }

  function handleSubmit() {
    let newPostText = postText.trim();
    if (postText.length === 0) {
      return;
    }
    console.log('Submitting post:', newPostText);
    submitting = true;
    createNewPost(getAuthTokenClient(), newPostText, attachments)
      .then(newPost => {
        if (newPost && newPost.id) {
          console.log('Created a new post:', newPost.id);
          setTimeout(() => {
            //window.location.reload();
          }, 1000);
        } else {
          alert('Failed to create a new post');
        }
      })
      .catch(err => {
        alert('Error creating a new post');
        console.log(err);
      })
      .finally(() => {
        submitting = true;
      });
  }
  
  function closeErrorBanner() {
    errorMessage = "";
  }
  
  function holdErrorBanner() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
  
  function restartErrorBanner() {
    timeout = setTimeout(() => {
      errorMessage = "";
    }, 2000);
  }

  function handleCancel() {
    postText = '';
    isSubmitVisible = false;
  }
</script>

<style>
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fade-in-buttons {
    animation: fadeIn 0.2s;
  }
  
  .hidden-banner {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s ease-out;
  }
  
  .visible-banner {
    visibility: visible;
    opacity: 1;
  }
</style>

{#if errorMessage}
  <div class:hidden-banner={errorMessage === ""} class:visible-banner={errorMessage !== ""} class="transition">
    <ErrorBanner errorMessage={errorMessage} onClose={closeErrorBanner} onHover={holdErrorBanner} onUnhover={restartErrorBanner} />
  </div>
{/if}

<div class="flex flex-col items-stretch w-full mx-auto mb-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl border-0 p-2 border-neutral-500">
  
  <textarea
    bind:value={postText}
    bind:this={textarea}
    on:input={handleInputChange}
    on:dragover={handleDragEnter}
    on:drop={handleDrop}
    on:dragleave={handleDragLeave}
    placeholder={isDragging ? 'Drop your files here' : "Write something here..."}
    disabled={submitting}
    use:autosize
    rows="4"
    id="new-post-textarea"
    class="w-full max-h-128 border-4 rounded-xl border-neutral-200 dark:border-good-dark-grey p-2 bg-neutral-100 dark:bg-neutral-800 text-base rounded resize-none"
    class:bg-neutral-200={isDragging}
    class:dark:bg-neutral-700={isDragging}
  ></textarea>

  <div class="flex flex-row max-md:flex-col gap-2">
    {#each attachments as attachment}
      <AttachmentIcon file={attachment} />
    {/each}
  </div>

  <div class="flex flex-row p-1 gap-1 rounded-lg bg-neutral-200 dark:bg-neutral-800">
    <button class="p-1 rounded-md transition dark:bg-neutral-700 hover:dark:bg-neutral-800 bg-neutral-200 hover:bg-neutral-300">
      <PaperclipIcon />
    </button>
  
    <span class="flex-1"></span>
    
    {#if isSubmitVisible}
      <div class="flex flex-row justify-end gap-2 transition fade-in-buttons">
        <button on:click={handleSubmit} disabled={submitting} class="btn-success px-2 text-white">Submit</button>
        <button on:click={handleCancel} disabled={submitting} class="btn-cancel px-2 text-white">Cancel</button>
      </div>
    {/if}
  </div>
</div>
