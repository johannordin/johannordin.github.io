<div class="about">
	<section class="intro">
		<h1>About Johan Nordin</h1>
		<p>
			I'm a developer based in Sweden. I build things on the web — mostly with .NET, Azure, and modern frontend frameworks. When I'm not writing code, I write about it: sharing what I learn along the way.
		</p>
	</section>

	<section class="what-i-work-with">
		<h2>What I Work With</h2>
		<div class="tech-list">
			<span class="tech-chip">.NET</span>
			<span class="tech-chip">C#</span>
			<span class="tech-chip">Azure</span>
			<span class="tech-chip">SvelteKit</span>
			<span class="tech-chip">TypeScript</span>
			<span class="tech-chip">Web Development</span>
		</div>
	</section>

	<section class="contact">
		<h2>Connect</h2>
		<p>
			Find me on <a href="https://github.com/johannordin">GitHub</a> for code and projects.
		</p>
	</section>
</div>

<style>
	.about {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-unit) * 12);
	}

	.about h1 {
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		margin: 0 0 calc(var(--spacing-unit) * 4) 0;
		color: var(--color-text-primary);
	}

	.about h2 {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-secondary);
		margin: 0 0 calc(var(--spacing-unit) * 4) 0;
		padding-bottom: 0;
		border-bottom: none;
	}

	.intro p {
		font-size: 1.1rem;
		line-height: 1.8;
		color: var(--color-text-primary);
		margin: 0;
	}

	.tech-list {
		display: flex;
		flex-wrap: wrap;
		gap: calc(var(--spacing-unit) * 3);
	}

	.tech-chip {
		display: inline-block;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		padding: 4px 10px;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
		white-space: nowrap;
	}

	.contact p {
		color: var(--color-text-primary);
		margin: 0;
	}

	@media (max-width: 600px) {
		.about h1 {
			font-size: 1.5rem;
		}

		.intro p {
			font-size: 1rem;
		}
	}
</style>