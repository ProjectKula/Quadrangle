<script lang="ts">
	import { getAuthTokenClient } from '$lib/auth/auth';
	import { follow, unfollow } from '$lib/graphql/user/following';

	import type { User } from '$lib/graphql/user/user';

	export let data: User

	const formatDate = (unixSeconds: number) => {
		const date = new Date(Math.round(unixSeconds) * 1000);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	$: isFollowing = data.followedBySelf;
	$: followerCount = data.followerCount;
	$: disableFollow = false;

	function followClick() {
		if (isFollowing) {
			unfollowUser();
		} else {
			followUser();
		}
	}

	function followUser() {
		disableFollow = true;
		follow(data.id, getAuthTokenClient())
			.then(() => {
				isFollowing = true;
				followerCount += isFollowing ? 1 : -1;
				disableFollow = false;
			})
	}

	function unfollowUser() {
		disableFollow = true;
		unfollow(data.id, getAuthTokenClient())
			.then(() => {
				isFollowing = false;
				followerCount += isFollowing ? 1 : -1;
				disableFollow = false;
			})
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-col md:flex-row mb-4">
		<img src="/default_pfp.svg" alt="Avatar" class="w-48 h-48 rounded-full" />
		<div class="flex flex-col md:ml-4">
			<h2 class="text-2xl">{data.name}</h2>
			{#if data.pronouns}
				<p class="text-neutral-500">{data.pronouns}</p>
			{/if}
			<p>{followerCount} follower{followerCount === 1 ? "" : "s"} </p>
			<p>{data.followingCount} following</p>
			<button class="btn-success" on:click={followClick} disabled={disableFollow}>
				{isFollowing ? "Unfollow" : "Follow"}
			</button>
		</div>
	</div>

	<div class="mb-4">
		<p>Branch: {data.branch}</p>
		{#if data.gender !== 'X'}
			<p>Gender: {data.gender}</p>
		{/if}
	</div>

	<p>Date Registered: {formatDate(data.dateRegistered)} • Reg. #{data.id}</p>
</div>
