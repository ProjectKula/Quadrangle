<script lang="ts">
  import { getRoot } from '$lib';

  export let data;
  
  console.log("data:")
  console.log(data);
  
  let nonce = data.nonce;
  
  let password: string = '';
  let confirmPassword: string = '';
  $: passwordsDoNotMatch = password !== confirmPassword;
  $: passwordTooShort = password ? password.length < 8 : 0;
  let processing = false;

  function handleSubmit() {
    if (passwordsDoNotMatch || passwordTooShort) return;
    
    let url = `${getRoot()}/v0/auth/password/reset/password?nonce=${nonce}`;
    let body = JSON.stringify({ newPassword: password });
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to reset password');
        }
      })
      .then(() => {
        alert('Password reset successfully');
        window.location.href = `/login`;
      })
      .catch(err => {
        alert('Failed to reset password');
        console.error(err);
      });
  }
</script>

<svelte:head>
  <title>Forgot Password</title>
  <meta name="description" content="Reset your password" />
</svelte:head>

<div class="flex items-center justify-center h-screen">
  <div class="flex flex-col w-96 p-8 dark:bg-good-dark-grey bg-neutral-100 shadow-md rounded-md">
    <div class="flex flex-col">
      <h2 class="text-2xl font-semibold mb-4">Forgot Password</h2>

      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-2">
          <input type="password" id="password" bind:value={password} placeholder="Password"
                 class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
        </div>

        <div class="mb-2">
          <input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="Confirm Password"
                 class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
        </div>

        {#if passwordsDoNotMatch}
          <p class="col-span-2 text-red-500 text-sm">Passwords do not match</p>
        {/if}
        {#if passwordTooShort}
          <p class="col-span-2 text-red-500 text-sm">Password must be at least 8 characters long</p>
        {/if}

        <button type="submit" class="w-full mt-2 p-2 btn-action" disabled={processing}>
          Continue
        </button>
      </form>
    </div>
  </div>
</div>
