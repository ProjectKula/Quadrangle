<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client"></script>
</svelte:head>

<div id="g_id_onload"
     data-client_id="1063344969029-el3e8icroegg8f7566okkvum7bgbrvb8.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="redirect"
     data-login_uri="{$page.url.origin}/googleCallback"
     data-auto_prompt="false"
>
</div>

<div class="g_id_signin " 
     data-type="standard"
     data-shape="pill"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left"
     data-width="320"
>
</div>
