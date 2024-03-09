<script>
	import { faHome, faList, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

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

<div class="flex-none flex-col items-start justify-between p-4 dark:bg-neutral-800 bg-neutral-200 border-r dark:border-black border-neutral-300">
	<div class="flex flex-col justify-start">
		<h1 class="text-sm">Under Construction</h1>

		{#each menuItems as { text, icon, link } (text)}
			<div>
				<a href={link} class:active={currentPath === link}
					 class="flex mx-1 my-4 p-2 text-xl items-center border-0 dark:border-white border-black dark:hover:bg-neutral-700 hover:bg-neutral-200 {currentPath === link ? 'dark:bg-[#2a2a2a] bg-neutral-200' : ''} transition rounded {currentPath === link ? 'font-bold' : ''}"
				>
					<div class="flex flex-row">
						<div class="sm:mr-2">
							<Fa size={"lg"} icon={icon} />
						</div>
						<span class="max-sm:hidden text-lg">{text}</span>
					</div>
				</a>
			</div>
		{/each}

		<ThemeSwitcher />
	</div>
</div>
