<script lang="ts">
	import { game, SCREENS } from '$lib/math/stores/gameStore.js';
	import StartScreen   from '$lib/math/components/StartScreen.svelte';
	import BossWarning   from '$lib/math/components/BossWarning.svelte';
	import Game          from '$lib/math/components/Game.svelte';
	import LevelComplete from '$lib/math/components/LevelComplete.svelte';
	import GameOver      from '$lib/math/components/GameOver.svelte';
	import Victory       from '$lib/math/components/Victory.svelte';
</script>

<svelte:head>
	<title>Math of the Dead</title>
</svelte:head>

{#if $game.screen === SCREENS.START}
	<StartScreen />
{:else if $game.screen === SCREENS.BOSS_WARNING}
	<BossWarning />
{:else if $game.screen === SCREENS.GAME}
	<Game />
{:else if $game.screen === SCREENS.LEVEL_COMPLETE}
	<LevelComplete />
{:else if $game.screen === SCREENS.GAME_OVER}
	<GameOver />
{:else if $game.screen === SCREENS.VICTORY}
	<Victory />
{/if}
