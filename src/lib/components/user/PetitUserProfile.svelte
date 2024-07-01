<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";

  export let user: { id: number, name: string, avatarHash: string};

  let avatarUrl = user.avatarHash ? `${PUBLIC_BUCKET_URL}/${user.avatarHash}` : '/default_pfp.svg';
</script>

<div class="flex gap-2 w-full items-center">
  <img src={avatarUrl} alt ="Avatar" class = "w-8 h-8 rounded-full" />

  <a href="/user/{user.id}" class="hoverBlue">{user.name}</a>
</div>
