<script>
  import { browser } from '$app/environment';
  import '../app.css';

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

<slot />
