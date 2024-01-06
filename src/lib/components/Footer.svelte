<script>
	import { faGavel, faCodeCommit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	// TODO: parameterize
	let copyrightText = '© 2023 cyberslothz and contributors.';
</script>

<div class="flex flex-col text-sm text-gray-300">
	<h5 class="mb-4">{copyrightText}</h5>
	<div class="flex flex-row">
		<a href="/legal" class="mr-4"><Fa icon={faGavel}/> Legal</a>
		<a href="https://github.com/cyberslothz" class="mr-4"><Fa icon={faCodeCommit}/> Source</a>
	</div>
</div>
