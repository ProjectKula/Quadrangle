<script lang="ts">
  import { browser } from '$app/environment';
  import { loginWithCredentials, setAuthCookies } from '$lib/auth/auth';
  import SignInWithGoogle from '$lib/components/SignInWithGoogle.svelte';

  let id = '';
  let password = '';
  let idError: string | null = null;
  let passwordError: string | null = null;

  function validate(): boolean {
    let valid: boolean = true;

    if (!password) {
      valid = false;
      passwordError = 'Please enter a password';
    }

    if (!id) {
      valid = false;
      idError = 'Please enter RVCE ID / Email ID';
    }

    return valid;
  }

  function handleSubmit() {
    if (validate()) {
      loginWithCredentials(id, password).then((resp) => {
        if (browser) {
          if (setAuthCookies(resp)) {
            window.location.href = '/';
          } else {
            passwordError = 'Invalid username / password';
          }
        }
      });
    }
  }
</script>

<svelte:head>
  <title>Log In</title>
  <meta name="description" content="Log in to your account" />

  <!--  <script src="https://accounts.google.com/gsi/client" async></script>-->
</svelte:head>

<div class="flex items-center justify-center max-sm:h-[80vh] sm:h-screen">
  <div class="flex flex-col sm:w-96 p-8 max-sm:w-full dark:bg-good-dark-grey bg-neutral-100 shadow-md rounded-md">
    <div class="flex flex-col">
      <h2 class="text-2xl font-semibold mb-4">Log In</h2>

      <SignInWithGoogle />

      <h2 class="text-xl font-semibold m-4 text-center">Or</h2>

      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-2">
          <input type="text" id="usn" bind:value={id} placeholder="RVCE ID / Email" on:input={() => (idError = null)}
                 class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
          {#if idError}
            <p class="text-red-500 text-xs mt-1">{idError}</p>
          {/if}
        </div>

        <div class="mb-2">
          <input type="password" id="password" bind:value={password} placeholder="Password"
                 on:input={() => (passwordError = null)}
                 class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
          {#if passwordError}
            <p class="text-red-500 text-xs mt-1">{passwordError}</p>
          {/if}
        </div>

        <div class="flex justify-between flex-row">
          <span class="mb-2 hoverBlue">
            <a href="/signup">Sign Up</a>
          </span>

          <span class="mb-2 hoverBlue">
            <a href="/login/forgot">Forgot Password</a>
          </span>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white mt-2 p-2 rounded-md hover:bg-blue-600 transition">
          Log In
        </button>
      </form>
    </div>
  </div>
</div>
