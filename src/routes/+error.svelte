<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-page">
	<div class="error-content">
		<p class="error-label">Error {page.status}</p>
		<h1 class="error-title">
			{#if page.status === 404}
				Page not found
			{:else}
				Something went wrong
			{/if}
		</h1>
		<p class="error-description">
			{#if page.status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else}
				{page.error?.message ?? 'An unexpected error occurred.'}
			{/if}
		</p>
		<a href="/" class="error-cta">← Back to home</a>
	</div>
</div>

<style>
	.error-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
	}

	.error-content {
		text-align: center;
		max-width: 400px;
	}

	.error-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0 0 calc(var(--spacing-unit) * 4) 0;
	}

	.error-title {
		font-size: 2.5rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.1;
		margin: 0 0 calc(var(--spacing-unit) * 4) 0;
		background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.error-description {
		color: var(--color-text-secondary);
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 0 0 calc(var(--spacing-unit) * 8) 0;
	}

	.error-cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 10px 20px;
		background: var(--color-accent);
		color: #ffffff;
		text-decoration: none;
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		transition:
			background-color 150ms ease,
			transform 100ms ease;
	}

	.error-cta:hover {
		background: var(--color-accent-hover);
		transform: translateY(-1px);
		text-decoration: none;
		color: #ffffff;
	}
</style>
