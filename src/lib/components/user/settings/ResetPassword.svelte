<script lang="ts">
  import { getRoot } from '$lib';
  import { getAuthTokenClient } from '$lib/auth';

  let oldPassword: string;
  let newPassword: string;
  let confirmPassword: string;
  $: passwordsDoNotMatch = newPassword !== confirmPassword;
  $: passwordTooShort = newPassword ? newPassword.length < 8 : 0;
  
  interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
  }
  
  function onConfirm(): void {
    if (newPassword.length === 0 || confirmPassword.length === 0 || oldPassword.length === 0) {
      return;
    }
    if (passwordsDoNotMatch || passwordTooShort) {
      return;
    }
    let route: string = `${getRoot()}/v0/auth/password/change`
    let body = JSON.stringify({
      currentPassword: oldPassword,
      newPassword: newPassword
    } as ChangePasswordRequest);
    fetch(route, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthTokenClient()}`
      },
      body: body
    }).then(async response => {
      if (response.ok) {
        alert('Password changed successfully');
      } else {
        alert('Failed to change password');
        console.log(response.status, await response.text());
      }
    });
  }
</script>

<div class="flex flex-col w-96 gap-2 mt-4 p-4 rounded-md dark:bg-neutral-700 bg-neutral-100">
  <h2 class="text-2xl font-light">Reset password</h2>
  <div class="grid grid-cols-2 text-lg gap-y-2">
    <label for="old-password">Current password</label>
    <input bind:value={oldPassword} type="password" id="old-password" name="old-password" class="rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
    <label for="password">New password</label>
    <input bind:value={newPassword} type="password" id="password" name="password" class="rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
    <label for="password-confirm">Confirm password</label>
    <input bind:value={confirmPassword} type="password" id="password-confirm" name="password-confirm" class="rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
    {#if passwordsDoNotMatch}
      <p class="col-span-2 text-red-500 text-sm">Passwords do not match</p>
    {/if}
    {#if passwordTooShort}
      <p class="col-span-2 text-red-500 text-sm">Password must be at least 8 characters long</p>
    {/if}
  </div>
  <button on:click={onConfirm} class="btn-success py-1 px-2 text-lg flex-shrink">Reset password</button>
</div>
