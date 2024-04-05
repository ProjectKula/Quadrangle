<script>
  import LatestConfessionsPane from "./confessions/LatestConfessionsPane.svelte";

  let copyrightText = '© 2023 Project Kula and contributors';
</script>

<div
  class="flex flex-col flex-shrink text-sm text-neutral-500 bg-neutral-200 dark:bg-neutral-800 border-l border-neutral-300 dark:border-black px-1 max-md:hidden items-center">
  <h5 class="mb-4">{copyrightText}</h5>
  <div class="flex flex-row gap-4 flex-wrap">
    <a href="/legal">Legal</a> 
    •
    <a href="https://github.com/projectkula">Source</a>
    •
    <a href="https://github.com/projectkula/docs">Docs</a>
  </div>

  <h2 class="normalColors text-xl mt-10">Recent</h2>
  
  <LatestConfessionsPane />
</div>
