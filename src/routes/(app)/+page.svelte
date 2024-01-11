<script lang="ts">
	import NewPost from "$lib/components/posts/NewPost.svelte";
	import RecentPostCard from "$lib/components/posts/RecentPostCard.svelte";
	import type { RecentPost } from "$lib/graphql/recentPosts";

	export let data: {data: RecentPost[]}
</script>

<div class="contents">
	<div class="flex flex-row">
		<NewPost />
	</div>
	
	<div class="flex flex-col">
		{#each data.data as post}
			<RecentPostCard {post} />
		{/each}
	</div>
</div>
