<script lang="ts">
  import ConfessionsGallery from "$lib/components/confessions/ConfessionsGallery.svelte";
  import type { ConfessionsPage } from "$lib/graphql/confessions";

  export let data: ConfessionsPage;
</script>

<div class="flex flex-col">
  <h1 class="font-semibold text-3xl">Confessions</h1>

  <ConfessionsGallery confessions={data} />
</div>
