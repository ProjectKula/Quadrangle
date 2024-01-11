<script lang="ts">
	import type { RecentPost } from "$lib/graphql/recentPosts";

    export let post: RecentPost;

    let date = new Date(post.createdAt * 1000);
    let dateStr = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    let timeStr = date.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute:'2-digit'
    });
</script>

<div class="flex flex-col">

    <div class="flex flex-row">
        <!-- <a href="/user/{post.creator}">{post.creator}</a> -->
        <span>{timeStr}, {dateStr}</span>
    </div>

    <p>
        {post.content}
    </p>
</div>
