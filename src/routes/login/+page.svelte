<script lang="ts">
	import { browser } from '$app/environment';
  import { loginWithCredentials, setAuthCookies } from '$lib/auth/auth';

  let id = "";
	let password = "";
	let idError: string | null = null;
	let passwordError: string | null = null;

	function validate(): boolean {
		let valid: boolean = true;

		if (!password) {
			valid = false;
			passwordError = "Please enter a password";
		}

		if (!id) {
			valid = false;
			idError = "Please enter RVCE ID / Email ID";
		}

		return valid;
	}

	function handleSubmit() {
		if (validate()) {
      loginWithCredentials(id, password)
				.then(resp => {
          if (browser) {
            if (setAuthCookies(resp)) {
							window.location.href = "/";
						} else {
							passwordError = "Invalid username / password";
						}
          }
        });
		}
	}
</script>

<div class="flex items-center justify-center h-screen text-white">
	<div class="w-96 p-8 bg-good-dark-grey shadow-md rounded-md">
		<h2 class="text-2xl font-semibold mb-4">Log In</h2>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-4">
<!--				<label for="usn" class="block text-sm font-medium text-gray-300">USN / Email ID</label>-->
				<input
					type="text"
					id="usn"
					bind:value={id}
					placeholder="RVCE ID / Email ID"
					on:input={() => idError = null} class="mt-1 p-2 w-full rounded-md bg-good-grey text-gray-100">
				{#if idError}
					<p class="text-red-500 text-xs mt-1">{idError}</p>
				{/if}
			</div>

			<div class="mb-2">
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="Password"
					on:input={() => passwordError = null} class="mt-1 p-2 w-full rounded-md bg-good-grey text-gray-100">
				{#if passwordError}
					<p class="text-red-500 text-xs mt-1">{passwordError}</p>
				{/if}
			</div>

			<span class="mb-2 text-blue-400 hover:text-blue-500 transition">
				<a href="/login/forgot">Forgot Password</a>
			</span>

			<button type="submit" class="w-full bg-blue-500 text-white mt-2 p-2 rounded-md hover:bg-blue-600 transition">
				Log In
			</button>
		</form>
	</div>
</div>
