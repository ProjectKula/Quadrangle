<script lang="ts">
  import type { RecentPost } from '$lib/graphql/post/recentPosts';

  export let post: RecentPost;

  let date = new Date(post.createdAt * 1000);
  let dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  let timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
</script>

<div class="flex flex-col flex-1 rounded bg-neutral-100 dark:bg-neutral-800 p-2">

  <div class="flex flex-row flex-shrink">
    <!-- <a href="/user/{post.creator}">{post.creator}</a> -->
    <span>{dateStr}, {timeStr}</span>
  </div>

  <p class="min-width-0">
    {post.content}
  </p>

  <p>
    {post.likesCount} Like{post.likesCount === 1 ? '' : 's'}
  </p>
</div>
