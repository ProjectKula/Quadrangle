<script lang="ts">
  import autosize from 'svelte-autosize';
  import { createNewPost } from '$lib/graphql/newPost';
  import { getAuthTokenClient } from '$lib/auth/auth';

  let postText = '';
  let isSubmitVisible = false;
  let submitting = false;

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
    createNewPost(getAuthTokenClient(), newPostText)
      .then(newPost => {
        if (newPost.id) {
          console.log('Created a new post:', newPost.id);
          setTimeout(() => {
            window.location.reload();
          }, 500);
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

<div class="flex flex-col items-stretch w-full mx-auto">
  <textarea
    bind:value={postText}
    on:input={handleInputChange}
    placeholder="Write something here..."
    disabled={submitting}
    use:autosize
    rows="4"
    class="w-full max-h-128 border-4 border-neutral-200 dark:border-good-dark-grey mb-4 p-2 bg-neutral-100 dark:bg-neutral-800 text-base rounded resize-none"
  ></textarea>

  {#if isSubmitVisible}
    <div class="flex flex-row justify-end gap-2 transition fade-in-buttons">
      <button on:click={handleSubmit} disabled={submitting} class="btn-success px-2 py-1 text-white">Submit</button>
      <button on:click={handleCancel} disabled={submitting} class="btn-cancel px-2 py-1 text-white">Cancel</button>
    </div>
  {/if}
  <span class="py-4" class:hidden={isSubmitVisible}></span>
</div>
