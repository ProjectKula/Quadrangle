<script>
  import { page } from '$app/stores';

  console.log($page.url.origin)

  let originWithoutSlash = $page.url.origin.endsWith('/')
    ? $page.url.origin.slice(0, -1)
    : $page.url.origin;
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client"></script>
</svelte:head>

<div id="g_id_onload"
     data-client_id="1063344969029-3pa3rpdi3l0untjp9oij2r9pa4uh0imt.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="redirect"
     data-login_uri={`${originWithoutSlash}/googleCallback`}
     data-auto_prompt="false">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="pill"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left"
     data-width="320">
</div>
