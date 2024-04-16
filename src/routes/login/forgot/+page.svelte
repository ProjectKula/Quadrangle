<script lang="ts">
  import { getRoot } from '$lib';
  import Spinner from '$lib/components/util/Spinner.svelte';

  let emailId = '';
  let success = false;
  let processing = false;
  
  function handleSubmit() {
    let url = `${getRoot()}/v0/auth/password/reset/request`;
    let body = { email: emailId };
    processing = true;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(async (res) => {
      if (res.status == 204) {
        success = true;
      } else {
        let data = await res.json();
        console.error(data);
      }
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      processing = false;
    });
  }
</script>

<svelte:head>
  <title>Log In</title>
  <meta name="description" content="Log in to your account" />

  <!--  <script src="https://accounts.google.com/gsi/client" async></script>-->
</svelte:head>

<div class="flex items-center justify-center h-screen">
  <div class="flex flex-col w-96 p-8 dark:bg-good-dark-grey bg-neutral-100 shadow-md rounded-md">
    <div class="flex flex-col">
      <h2 class="text-2xl font-semibold mb-4">Forgot Password</h2>
      
      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-2">
          <input type="email" id="email" bind:value={emailId} placeholder="RVCE Email"
                 class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
        </div>

        <div class="flex justify-between flex-row">
          <span class="mb-2 hoverBlue">
            <a href="/signup">Sign Up</a>
          </span>

          <span class="mb-2 hoverBlue">
            <a href="/login">Log In</a>
          </span>
        </div>

        <button type="submit" class="w-full mt-2 p-2 btn-action" disabled={processing}>
          Continue
        </button>
      </form>

      {#if success}
        <div class="mt-4">
          <p>
            If the user exists, you will receive an email with instructions to reset your password.
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
