<script lang="ts">
  // TODO: MASSIVE VIEW CONTROLLER! SPLIT THIS!!

  import { requestEmailCode, sendEmailCode, setInitialCredentials } from '$lib/auth/signup';
  import { browser } from '$app/environment';
  import { setAuthCookies } from '$lib/auth/auth';

  let id = '';
  let email = '';
  let idError = '';
  let emailError = '';
  let emailCode = '';
  let password = '';
  let confirmPassword = '';
  let passwordError = '';
  let emailCodeError = '';
  let token = '';
  let signupStage: 'initial' | 'code' | 'password' | 'error' | 'finished' = 'initial';
  let loading = false;

  function validateInitial(): boolean {
    const rvceDomainRegex = /@rvce\.edu\.in$/;

    let idValid = true;
    let emailValid = true;

    if (id === '') {
      idError = 'Please enter your RVCE ID';
      idValid = false;
    } else if (id.length < 8) {
      idError = 'ID must be at least 8 characters';
      idValid = false;
    } else {
      idError = '';
    }

    if (email === '') {
      idError = 'Please enter your RVCE email';
      idValid = false;
    } else if (!rvceDomainRegex.test(email)) {
      emailError = 'Please enter an RVCE email address.';
      emailValid = false;
    } else {
      emailError = '';
    }

    return emailValid && idValid;
  }

  function validateCode(): boolean {
    if (emailCode === '') {
      emailCodeError = 'Please enter the 6 digit code sent to your email';
      return false;
    } else if (emailCode.length != 6) {
      emailCodeError = 'Code must be 6 characters';
      return false;
    }
    return true;
  }

  function validatePassword(): boolean {
    if (password === '') {
      passwordError = 'Please enter a password';
      return false;
    } else if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters';
      return false;
    } else if (password !== confirmPassword) {
      passwordError = 'Passwords do not match';
      return false;
    }
    return true;
  }

  function handleInitialSubmit() {
    if (validateInitial()) {
      loading = true;
      requestEmailCode(id, email)
        .then((resp) => {
          token = resp.state;
        })
        .catch(() => {
          signupStage = 'error';
        })
        .finally(() => {
          loading = false;
        });
      signupStage = 'code';
    }
  }

  function handleCodeSubmit() {
    if (validateCode()) {
      loading = true;
      sendEmailCode(token, emailCode)
        .then((resp) => {
          token = resp.state;
          signupStage = 'password';
        })
        .catch(() => {
          signupStage = 'error';
        })
        .finally(() => {
          loading = false;
        });
    }
  }

  function handlePasswordSubmit() {
    if (validatePassword()) {
      loading = true;
      setInitialCredentials(token, password)
        .then((resp) => {
          if (browser) {
            setAuthCookies(resp);
          }
          signupStage = 'finished';
        })
        .catch(() => {
          signupStage = 'error';
        })
        .finally(() => {
          loading = false;
        });
    }
  }
</script>

<svelte:head>
	  <title>Sign Up</title>
	  <meta name="description" content="Sign up for an account" />
</svelte:head>

<div class="flex items-center justify-center h-screen">
  <div class="w-96 p-8 dark:bg-good-dark-grey bg-neutral-100 shadow-md rounded-md">
    <h2 class="text-2xl font-semibold mb-4">Sign Up</h2>

    {#if signupStage === 'initial'}
      <form on:submit|preventDefault={handleInitialSubmit}>
        <div class="mb-4">
          <input type="text" id="rvceId" bind:value={id} placeholder="RVCE ID" class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
          {#if idError}
            <p class="text-red-500 text-xs mt-1">{idError}</p>
          {/if}
        </div>

        <div class="mb-2">
          <input type="email" id="rvceEmail" bind:value={email} placeholder="RVCE Email" class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
          {#if emailError}
            <p class="text-red-500 text-xs mt-1">{emailError}</p>
          {/if}
        </div>

        <a class="mb-2 hoverBlue" href="/login">Log In</a>
        •
        <a class="mb-2 hoverBlue" href="mailto:shrishvd.cy23@rvce.edu.in">Tech Support</a>

        <button type="submit" class="w-full bg-blue-500 text-white mt-2 p-2 rounded-md hover:bg-blue-600 transition" disabled={loading}> Sign Up </button>
      </form>
    {:else if signupStage === 'code'}
      <form on:submit|preventDefault={handleCodeSubmit}>
        <div class="mb-4">
          <label for="emailCode" class="block text-sm font-medium">Enter the 6 digit code sent to {email}</label>
          <input type="text" id="emailCode" bind:value={emailCode} class="mt-1 p-2 w-full rounded-md bg-good-grey text-gray-100" />
          {#if emailCodeError}
            <p class="text-red-500 text-xs mt-1">{emailCodeError}</p>
          {/if}
        </div>

        <button type="submit" class="w-full bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition" disabled={loading}> Submit </button>
      </form>
    {:else if signupStage === 'password'}
      <form on:submit|preventDefault={handlePasswordSubmit}>
        <div class="mb-4">
          <input type="password" id="password" bind:value={password} placeholder="Password" class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-300 dark:text-gray-100" />
        </div>
        <div class="mb-4">
          <input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="Confirm password" class="mt-1 p-2 w-full rounded-md dark:bg-good-grey bg-neutral-300 dark:text-gray-100" />
          {#if passwordError}
            <p class="text-red-500 text-xs mt-1">{passwordError}</p>
          {/if}
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition" disabled={loading}> Sign Up </button>
      </form>
    {:else if signupStage === 'finished'}
      <p>All Done!</p>
      <p>Click the button below to get started</p>

      <a href="/">
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition" disabled={loading}> Get Started </button>
      </a>
    {:else if signupStage === 'error'}
      <p>An error occured. Please report this issue</p>
    {/if}
  </div>
</div>
