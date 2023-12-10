<script lang="ts">
	let usn = "";
	let email = "";
	let usnError = "";
	let emailError = "";

	function validate(): boolean {
		const rvceDomainRegex = /@rvce\.edu\.in$/;

		let usnValid = true;
		let emailValid = true;

		if (usn === "") {
			usnError = "Please enter your USN"
			usnValid = false;
		} else if (usn.length < 8) {
			usnError = "USN must be at least 8 characters"
			usnValid = false;
		} else {
			usnError = ""
		}

		if (email === "") {
			usnError = "Please enter your RVCE email"
			usnValid = false;
		} else if (!rvceDomainRegex.test(email)) {
			emailError = "Please use an RVCE email address.";
			emailValid = false;
		} else {
			emailError = ""
		}

		return emailValid && usnValid;
	}

	function handleSubmit() {
		if (validate()) {
			console.log("Signup successful:", usn, email);
		}
	}
</script>

<div class="flex items-center justify-center h-screen">
	<div class="w-96 p-8 bg-white shadow-md rounded-md">
		<h2 class="text-2xl font-semibold mb-4">Sign Up</h2>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-4">
				<label for="usn" class="block text-sm font-medium text-gray-600">USN</label>
				<input type="text" id="usn" bind:value={usn} class="mt-1 p-2 w-full border rounded-md">
				{#if usnError}
					<p class="text-red-500 text-xs mt-1">{usnError}</p>
				{/if}
			</div>

			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-600">RVCE Email</label>
				<input type="email" id="email" bind:value={email} class="mt-1 p-2 w-full border rounded-md">
				{#if emailError}
					<p class="text-red-500 text-xs mt-1">{emailError}</p>
				{/if}
			</div>

			<button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
				Sign Up
			</button>
		</form>
	</div>
</div>
