<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Fa from 'svelte-fa';
	import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
</script>

<div class="flex flex-col bg-black h-screen">
	<div class="flex flex-1">
		<Sidebar />
		<div class="flex-1 p-4">
			<div class="mb-4 flex items-center">
				<input type="text"
							 placeholder="Search..."
							 class="bg-[#2a2a2a] text-white text-lg p-2 border-gray-[#2a2a2a] rounded-md flex-1 mr-2"
				>
				<button class="p-2 bg-gray-800 text-white rounded-md"><Fa icon={faMagnifyingGlass} size="lg"/></button>
			</div>
			<slot />
		</div>
		<div class="flex flex-none">
			<Footer />
		</div>
	</div>
</div>
