<script lang="ts">
	import SelfUser from '$lib/components/user/SelfUser.svelte';

	export let data;
</script>

<!--TODO: if its the current user, display different component-->
<SelfUser data={data} />
