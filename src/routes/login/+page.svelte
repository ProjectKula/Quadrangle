<script lang="ts">
  import { browser } from '$app/environment';
  import { loginWithCredentials, setAuthCookies } from '$lib/auth/auth';
  import { page } from '$app/stores';

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

  <script src="https://accounts.google.com/gsi/client" async></script>

  <script>
    function handleCredentialResponse(response) {
      // decodeJwtResponse() is a custom function defined by you
      // to decode the credential response.
      console.log(response.credential)
    }
  </script>
</svelte:head>

<div class="flex items-center justify-center h-screen">
  <div class="flex flex-col-reverse sm:flex-row sm:w-[192] p-8 dark:bg-good-dark-grey bg-neutral-100 shadow-md rounded-md">
    <div class="flex flex-col basis-1/2">
      <h2 class="text-2xl font-semibold mb-4">Log In</h2>

      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
          <input type="text" id="usn" bind:value={id} placeholder="RVCE ID / Email" on:input={() => (idError = null)} class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
          {#if idError}
            <p class="text-red-500 text-xs mt-1">{idError}</p>
          {/if}
        </div>

        <div class="mb-2">
          <input type="password" id="password" bind:value={password} placeholder="Password" on:input={() => (passwordError = null)} class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
          {#if passwordError}
            <p class="text-red-500 text-xs mt-1">{passwordError}</p>
          {/if}
        </div>

        <span class="mb-2 hoverBlue">
        <a href="/signup">Sign Up</a>
      </span>
        •
        <span class="mb-2 hoverBlue">
        <a href="/login/forgot">Forgot Password</a>
      </span>

        <button type="submit" class="w-full bg-blue-500 text-white mt-2 p-2 rounded-md hover:bg-blue-600 transition"> Log In </button>
      </form>
    </div>
    <div class="flex basis-1/2">
      <div id="g_id_onload"
           data-client_id="1063344969029-el3e8icroegg8f7566okkvum7bgbrvb8.apps.googleusercontent.com"
           data-context="signin"
           data-ux_mode="redirect"
           data-login_uri="{$page.url.origin}/googleCallback"
           data-auto_prompt="false">
      </div>

      <div class="g_id_signin"
           data-type="standard"
           data-shape="rectangular"
           data-theme="outline"
           data-text="signin_with"
           data-size="large"
           data-logo_alignment="left">
      </div>
    </div>
  </div>
</div>
