<script>
  import { faHome, faList, faUser, faSignOut, faTimeline, faRankingStar, faStar, faEnvelope, faSmileWink } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { page } from '$app/stores';
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

  let menuItems = [
    { text: '🏠 Home', icon: faHome, link: '/' },
    { text: '🌎 Explore', icon: faStar, link: '/explore' },
    { text: '😉 Confess', icon: faSmileWink, link: '/confess' },
    { text: '👤 Profile', icon: faUser, link: '/user/me' },
    { text: '↪️ Log out', icon: faSignOut, link: '/logout' }
  ];

  $:currentPath = $page.url.pathname;

  // if (browser) {
  // 	onMount(() => {
  // 		currentPath = window.location.pathname;
  // 	});
  // }
</script>


<div
  class="gap-0 flex flex-shrink flex-col items-start justify-between p-4 dark:bg-neutral-800 bg-neutral-200 border-r dark:border-black border-neutral-300 min-h-screen">
  <div class="contents">
    <h1 class="text-sm max-sm:hidden">Under Construction</h1>

    {#each menuItems as { text, icon, link } (text)}
      <div>
        <a href={link} class:active={currentPath === link}
          class="flex mx-1 my-2 p-2 text-xl items-center border-0 dark:border-white border-black dark:hover:bg-neutral-700 hover:bg-neutral-200 {currentPath === link ? 'dark:bg-[#2a2a2a] bg-neutral-200' : ''} transition rounded {currentPath === link ? 'font-bold' : ''}"
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

    <div class="flex flex-1"></div>

    <div class="hidden sm:block"><ThemeSwitcher /></div>
  </div>
</div>
