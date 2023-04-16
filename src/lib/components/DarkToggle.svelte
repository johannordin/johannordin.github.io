<script>
	  import { browser } from '$app/environment'
	let darkMode = false;
    const storageKey = 'dark-mode';
	if(browser) {
		const val = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light'
    	darkMode = val === 'dark';
    	const html = document.getElementsByTagName("html")[0];
		if(darkMode)
			html.classList.add("dark")
	}
	
	function toggle() {
        darkMode = !darkMode;
        document.getElementsByTagName("html")[0].classList.toggle("dark")
    }
</script>

<button on:click={toggle}>
	{#if darkMode }
		☀️
	{:else}
		🌙
	{/if}
</button>

<style>
	button {
		background: var(--bg-color);
		border: 2px solid var(--text-color);
		border-radius: 5px;
		color: var(--text-color);
		padding: 10px 15px;
		font-size: x-large;
		position: absolute;
		top: 0;
		right: 0;
	}
	
	button:active {
		background: inherit;
	}
</style>