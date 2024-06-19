<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
</script>

<div class="flex flex-row flex-1 h-screen overflow-hidden">
  <div class="contents max-sm:hidden">
    <Sidebar />
  </div>
  <div class="flex flex-col flex-1">
    <Header />
    <div class="p-4 h-full overflow-scroll">
      <slot />
    </div>
  </div>
  
  <Footer />
</div>
