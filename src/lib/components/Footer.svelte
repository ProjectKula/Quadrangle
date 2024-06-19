<script>
  import LatestConfessionsPane from "./confessions/LatestConfessionsPane.svelte";

  let copyrightText = '© 2023 Project Kula and contributors';
</script>

<div
  class="flex flex-col flex-shrink text-sm bg-neutral-200 dark:bg-neutral-800 border-l border-neutral-300 dark:border-black px-1 max-md:hidden items-center h-screen">
  <div class="contents text-neutral-500">
    <h5 class="mb-4">{copyrightText}</h5>
    <div class="flex flex-row gap-4 flex-wrap">
      <a href="/legal">Legal</a> 
      •
      <a href="https://github.com/projectkula" target="_blank">Source</a>
      •
      <a href="https://github.com/projectkula/docs" target="_blank">Docs</a>
    </div>
  </div>

  <h2 class="text-xl text-neutral-600 dark:text-neutral-400 mt-10">Recent Activity</h2>
  
  <LatestConfessionsPane />
</div>
