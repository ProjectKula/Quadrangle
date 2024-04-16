<script>
  import { page } from '$app/stores';

  console.log($page.url.origin)
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client"></script>
</svelte:head>

<div id="g_id_onload"
  data-client_id="1063344969029-gk4b26m2av5q9qdsa4e3j566697hjf78.apps.googleusercontent.com"
  data-context="signin"
  data-ux_mode="redirect"
  data-login_uri="http://localhost:5173/googleCallback"
  data-auto_prompt="false"
>
</div>

<div class="g_id_signin" 
     data-type="standard"
     data-shape="pill"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left"
     data-width="320"
>
</div>
