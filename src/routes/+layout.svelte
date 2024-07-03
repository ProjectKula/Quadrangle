<script>
  import { browser } from '$app/environment';
  import '../app.css';
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";

  function refreshTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  if (browser) {
    refreshTheme();
  }
</script>

<ProgressBar class="text-green-500" zIndex={100} />

<slot />
