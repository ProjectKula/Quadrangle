<script lang="ts">
	import type { RecentPost } from "$lib/graphql/recentPosts";

    export let post: RecentPost;

    let date = new Date(post.createdAt * 1000);
    let dateStr = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    let timeStr = date.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute:'2-digit'
    });
</script>

<div class="flex flex-col my-4 rounded bg-neutral-100 dark:bg-neutral-900">

    <div class="flex flex-row">
        <!-- <a href="/user/{post.creator}">{post.creator}</a> -->
        <span>{dateStr}, {timeStr}</span>
    </div>

    <p>
        {post.content}
    </p>

    <p>
        {post.likesCount} Like{post.likesCount === 1 ? '' : 's'}
    </p>
</div>
