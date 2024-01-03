<script>
	import { faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getContext } from 'svelte';
	import { browser } from '$app/environment';

	let menuItems = [
		{ text: 'Home', icon: faHome, link: '/' },
		{ text: 'Item 1', icon: faList, link: '/temp/1' },
		{ text: 'Item 2', icon: faList, link: '/temp/2' },
		{ text: 'Profile', icon: faUser, link: '/user/me' }
	];

	$: currentPath = '';
	if (browser) {
		currentPath = getContext('router').url;
	}
</script>

<div class="flex flex-col items-center p-4 bg-gray-800 text-white">
	{#each menuItems as { text, icon, link } (text)}
		<a href={link} class:active={currentPath === link} class="{currentPath === link ? 'bg-blue-500' : ''} flex items-center p-2">
			<div>
				<i class="mr-2"><Fa icon={icon} /></i>
				{text}
			</div>
		</a>
	{/each}
</div>
