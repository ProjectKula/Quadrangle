<script>
  import { faHome, faList, faUser, faSignOut, faTimeline, faRankingStar, faStar, faEnvelope, faSmileWink, faMultiply, faGear } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { page } from '$app/stores';
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import Notifications from './user/Notifications.svelte';

  let menuItems = [
    { text: '🏠 Home', icon: faHome, link: '/' },
    { text: '🌏 Explore', icon: faStar, link: '/explore/' },
    { text: '📜 Confess', icon: faSmileWink, link: '/confess/' },
    { text: '👤 Profile', icon: faUser, link: '/user/me/' },
    { text: '⚙️ Settings', icon: faGear, link: '/settings/'},
    { text: '↪️ Log out', icon: faSignOut, link: '/logout/' }
  ];

  $:currentPath = $page.url.pathname;
  $:pathWithTrailingSlash = currentPath.endsWith('/') ? currentPath : currentPath + '/';

  export let closeButton = false;
  export let sidebarOpen = true;

  // if (browser) {
  // 	onMount(() => {
  // 		currentPath = window.location.pathname;
  // 	});
  // }
</script>

<div
  class="gap-0 flex flex-shrink flex-col items-start justify-between p-4 dark:bg-neutral-800 bg-neutral-200 border-r dark:border-black border-neutral-300 h-screen">
  <h1 class="text-sm flex flex-row justify-center items-center w-full">
    Project Kula
    {#if closeButton}
      <button
        class="flex items-center justify-center p-2 text-2xl rounded-full"
        on:click={() => sidebarOpen = !sidebarOpen}>
        <Fa icon={faMultiply} />
      </button>
    {/if}
  </h1>

  {#each menuItems as { text, icon, link } (text)}
    <a href={link} on:click={() => sidebarOpen = false} class:active={pathWithTrailingSlash === link}
      class="flex mx-1 my-1 px-2 py-1 text-xl items-center border-0 dark:border-white border-black hover:bg-light-blurple dark:hover:bg-blurple transition rounded hover:underline w-full"
      class:font-bold={pathWithTrailingSlash === link}
      class:dark:bg-blurple={pathWithTrailingSlash === link}
      class:bg-light-blurple={pathWithTrailingSlash === link}
    >
      <div class="flex flex-row">
        <div class="mr-2 hidden">
          <Fa size={"lg"} icon={icon} />
        </div>
        <span class="text-lg">{text}</span>
      </div>
    </a>
  {/each}

  <div class="flex flex-1"></div>

  <Notifications closeCallback={() => sidebarOpen = false}/>
  
  <div class="block"><ThemeSwitcher /></div>
</div>
