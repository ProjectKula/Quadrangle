<script>
	import { faHome, faList, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let menuItems = [
		{ text: 'Home', icon: faHome, link: '/' },
		{ text: 'Item 1', icon: faList, link: '/temp/1' },
		{ text: 'Item 2', icon: faList, link: '/temp/2' },
		{ text: 'Profile', icon: faUser, link: '/user/me' },
		{ text: 'Log out', icon: faSignOut, link: '/logout' }
	];

	$:currentPath = browser ? window.location.pathname : '';

	if (browser) {
		onMount(() => {
			currentPath = window.location.pathname;
		});
	}
</script>

<p class="font-bold bg-[#2a2a2a]" style="display: none">bruh</p>
<div class="flex-initial flex-col items-start justify-start p-4 bg-black text-white">
	{#each menuItems as { text, icon, link } (text)}
		<div>
			<a href={link} class:active={currentPath === link}
				 class="flex mx-1 my-4 p-2 text-xl items-center border-2 border-white hover:bg-[#2a2a2a] {currentPath === link ? 'bg-[#2a2a2a]' : ''} transition rounded {currentPath === link ? 'font-bold' : ''}"
				 on:click={() => currentPath = link}
			>
				<div class="flex flex-row">
					<i class="mr-2"><Fa size={"lg"} icon={icon} /></i>
					<span>{text}</span>
				</div>
			</a>
		</div>
	{/each}
</div>
