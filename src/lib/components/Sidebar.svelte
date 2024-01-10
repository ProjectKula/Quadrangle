<script>
	import { faHome, faList, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';

	let menuItems = [
		{ text: 'Home', icon: faHome, link: '/' },
		{ text: 'Item 1', icon: faList, link: '/temp/1' },
		{ text: 'Item 2', icon: faList, link: '/temp/2' },
		{ text: 'Profile', icon: faUser, link: '/user/me' },
		{ text: 'Log out', icon: faSignOut, link: '/logout' }
	];

	$:currentPath = $page.url.pathname;

	// if (browser) {
	// 	onMount(() => {
	// 		currentPath = window.location.pathname;
	// 	});
	// }
</script>

<div class="flex-none flex-col items-start justify-start p-4 bg-black text-white">
	{#each menuItems as { text, icon, link } (text)}
		<div>
			<a href={link} class:active={currentPath === link}
				 class="flex mx-1 my-4 p-2 text-xl items-center border-2 border-white hover:bg-good-grey {currentPath === link ? 'bg-[#2a2a2a]' : ''} transition rounded {currentPath === link ? 'font-bold' : ''}"
			>
				<div class="flex flex-row">
					<div class="sm:mr-2">
						<Fa size={"lg"} icon={icon} />
					</div>
					<span class="max-sm:hidden">{text}</span>
				</div>
			</a>
		</div>
	{/each}
</div>
