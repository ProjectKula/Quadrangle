<script>
	import { faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let menuItems = [
		{ text: 'Home', icon: faHome, link: '/' },
		{ text: 'Item 1', icon: faList, link: '/temp/1' },
		{ text: 'Item 2', icon: faList, link: '/temp/2' },
		{ text: 'Profile', icon: faUser, link: '/user/me' }
	];

	let currentPath = '';
</script>

<div class="flex flex-col items-center p-4 bg-blue-500 text-white">
	{#each menuItems as { text, icon, link } (text)}
		<a href={link} class:active={currentPath === link} class="flex items-center p-2">
			<div class="flex flex-row items-center">
				<i class="mr-2"><Fa size={"lg"} icon={icon} /></i>
				<span>{text}</span>
			</div>
		</a>
	{/each}
</div>
