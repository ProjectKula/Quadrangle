<script lang="ts">
  import autosize from 'svelte-autosize';
  import { createNewPost } from '$lib/graphql/post/newPost';
  import { getAuthTokenClient } from '$lib/auth';
  import PaperclipIcon from '$lib/components/icon/PaperclipIcon.svelte';

  let postText = '';
  let isSubmitVisible = false;
  let submitting = false;
  $:isDragging = false;
  
  function handleDragEnter(e) {
    e.preventDefault()
    if (isDragging) {
      return;
    }
    console.log("start")
    isDragging = true;
    document.getElementById('new-post-textarea')?.classList.add('draggedTextArea')
  }
  
  function handleDragLeave(e) {
    console.log("end")
    isDragging = false;
    document.getElementById('new-post-textarea')?.classList.remove('draggedTextArea')
  }
  
  function handleDrop(e) {
    console.log("drop")
    isDragging = false;
    
    if (e.dataTransfer.items[0]?.kind === 'file') {
      let item: DataTransferItem = e.dataTransfer.items[0];
      let file: File = item.getAsFile()!;
      if (file.type) {
        if (file.size > 1024 * 1024 * 8) {
          alert('File size is too large. Maximum file size is 8MB');
          return;
        }
        postText = file.type + ' AND ' + file.name;
        e.preventDefault();
      }
    }
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
    createNewPost(getAuthTokenClient(), newPostText, [])
      .then(newPost => {
        if (newPost.id) {
          console.log('Created a new post:', newPost.id);
          setTimeout(() => {
            window.location.reload();
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
</style>

<div class="flex flex-col items-stretch w-full mx-auto mb-2">
  <textarea
    bind:value={postText}
    on:input={handleInputChange}
    on:dragover={handleDragEnter}
    on:drop={handleDrop}
    on:dragleave={handleDragLeave}
    placeholder={isDragging ? 'Drop your files here' : "Write something here..."}
    disabled={submitting}
    use:autosize
    rows="4"
    id="new-post-textarea"
    class="w-full max-h-128 border-4 border-neutral-200 dark:border-good-dark-grey mb-2 p-2 bg-neutral-100 dark:bg-neutral-800 text-base rounded resize-none"
    class:bg-neutral-200={isDragging}
    class:dark:bg-neutral-700={isDragging}
  ></textarea>

  <div class="flex flex-row justify-between py-1">
    <button class="p-1 rounded-md transition dark:bg-neutral-700 hover:dark:bg-neutral-800 bg-neutral-200 hover:bg-neutral-300">
      <PaperclipIcon />
    </button>
    
    {#if isSubmitVisible}
      <div class="flex flex-row justify-end gap-2 transition fade-in-buttons">
        <button on:click={handleSubmit} disabled={submitting} class="btn-success px-2 text-white">Submit</button>
        <button on:click={handleCancel} disabled={submitting} class="btn-cancel px-2 text-white">Cancel</button>
      </div>
    {/if}
  </div>
</div>
