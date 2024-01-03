<script>
	import { faGavel, faCodeCommit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	// TODO: parameterize
	let copyrightText = 'Copyright © 2023 cyberslothz and contributors.';
</script>

<div class="flex justify-between w-full bg-gray-800 text-white p-4">
	<h5 class="mb-4">{copyrightText}</h5>
	<div class="flex">
		<a href="/legal" class="mr-4"><Fa icon={faGavel}/> Legal</a>
		<a href="https://github.com/cyberslothz" class="mr-4"><Fa icon={faCodeCommit}/> Source</a>
	</div>
</div>
