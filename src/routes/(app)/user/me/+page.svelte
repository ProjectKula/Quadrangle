<script lang="ts">
	import RegularUser from '$lib/components/user/RegularUser.svelte';

	export let data;
</script>

<!--TODO: if its the current user, display different component-->
<RegularUser data={data} />
