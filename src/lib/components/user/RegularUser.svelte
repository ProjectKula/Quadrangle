<script lang="ts">
	export let data;

	const formatDate = (unixSeconds: number) => {
		const date = new Date(Math.round(unixSeconds) * 1000);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};
</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold mb-4">{data.name}</h1>

	<div class="mb-4">
		<p>Branch: {data.branch}</p>
		{#if data.pronouns}
			<p>Pronouns: {data.pronouns}</p>
		{/if}
		{#if data.gender !== 'X'}
			<p>Gender: {data.gender}</p>
		{/if}
	</div>

	<p>Date Registered: {formatDate(data.dateRegistered)}</p>

	<p>Registration Number: #{data.slug}</p>
</div>
