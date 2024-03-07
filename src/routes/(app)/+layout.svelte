<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Fa from 'svelte-fa';
	import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
</script>

<div class="flex flex-col min-h-screen">
	<div class="flex flex-1">
		<Sidebar />
		<div class="flex-1">
			<div class="mb-4 flex items-center border-b bg-neutral-200 border-neutral-300 dark:border-b-black dark:bg-neutral-800 p-2">
				<input type="text"
							 placeholder="Search..."
							 class="bg-neutral-100 dark:bg-black text-lg p-2 border-good-grey rounded-md flex-1 mr-2"
				>
				<button class="p-2 bg-gray-200 dark:bg-gray-800 rounded-md"><Fa icon={faMagnifyingGlass} size="lg"/></button>
			</div>
			<div class="p-4">
				<slot />
			</div>
		</div>
		<div class="flex flex-none">
			<Footer />
		</div>
	</div>
</div>
