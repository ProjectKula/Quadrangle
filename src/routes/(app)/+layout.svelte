<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Fa from 'svelte-fa';
	import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
</script>

<div class="min-h-screen flex">
	<Sidebar />
	<div class="flex-1 p-4">
		<div class="mb-4 flex items-center">
			<input type="text" placeholder="Search..." class="p-2 border rounded-md flex-1 mr-2">
			<button class="p-2 bg-gray-800 text-white rounded-md"><Fa icon={faMagnifyingGlass} /></button>
		</div>
		<div class="flex-1">
			<slot />
		</div>
	</div>
</div>

<Footer />
