<script>
  
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<style>
</style>

<div class="flex flex-col">
  <h1 class="text-3xl font-semibold">Settings</h1>
  
  <div class="flex flex-col gap-2 w-96 m-4 p-4 rounded-md dark:bg-neutral-700 bg-neutral-100 w-80">
    <h2 class="text-2xl font-light">Reset password</h2>
    <div class="grid grid-cols-2 text-lg gap-y-2">
      <label for="old-password">Current password</label>
      <input type="password" id="old-password" name="old-password" class="rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
      <label for="password">New password</label>
      <input type="password" id="password" name="password" class="rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
      <label for="password-confirm">Confirm password</label>
      <input type="password" id="password-confirm" name="password-confirm" class="rounded-md dark:bg-good-grey bg-neutral-200 dark:text-gray-100" />
    </div>
    <button class="btn-success py-1 px-2 text-lg flex-shrink">Reset password</button>
  </div>
</div>
