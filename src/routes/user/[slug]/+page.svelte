<script lang="ts">
  export let data;
</script>

<div class="flex items-center justify-center h-screen">
	<p>{data.name}</p>
	<p>{data.branch}</p>
	<p>{data.id}</p>
	<p>Registration number: {data.slug}</p>
</div>
