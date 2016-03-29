<template>

	<section class="publish-intro">
		<p>{{ name }} is currently in private beta as we refine the platform. Research projects are accepted on an invite-only basis.</p>
		<p>Want in? Submit a project.</p>
		<a v-link="{ name: 'submit' }" class="publish-button">Explore Projects</a>
	</section>
	<section class="publish-features publish-section">
		<div class="publish-section-wrapper">
			<div class="publish-features-why">
				<h2>Why work on {{ name }}?</h2>
			</div>
		</div>
		<div class="publish-section-wrapper">
			<div class="publish-features-list">
				<a class="publish-feature publish-feature--collaboration publish-feature--active" href="#!" @click.prevent="changeFeature('collaboration')">
					<h4>Powerful Collaboration Tools</h4>
					<p>Work with experts around the world, discuss ideas and share artifacts, from papers to data sets.</p>
				</a>
				<a class="publish-feature publish-feature--review" href="#!" @click.prevent="changeFeature('review')">
					<h4>Peer-review, available at any time</h4>
					<p>Request feedback from experts in the scientific community, <em>before</em> spending time and money conducting experiments.</p>
				</a>
				<a class="publish-feature publish-feature--citation" href="#!" @click.prevent="changeFeature('citation')">
					<h4>Citation and Viewership Metrics</h4>
					<p>All research projects are assigned DOIs, making contributions academically citable and trackable.</p>
				</a>
			</div>
		</div>
		<div class="publish-features-callout">
			<browser>
				<img src="https://placeholdit.imgix.net/~text?bg=444444&w=800&h=600" />
			</browser>
		</div>
	</section>
	<section class="publish-funding publish-section">
		<div class="publish-section-wrapper">
			<h2>Open Problems and Open Grants</h2>
			<p>By partnering with major grant providers like the <a href="http://nsf.gov/" target="_blank">NSF</a>, <a href="http://noao.edu" target="_blank">NAOA</a>, and others, {{ name }} gives you more opportunity for proposing and funding your research.</p>
			<a href="#!">Browse Open Grants</a>
		</div>
	</section>
	<section class="publish-integrations home-section">
		<div class="publish-section-wrapper">
			<h2>Integrations with your favourite tools</h2>
			<p>{{ name }} makes it easy to work as you'd like, by connecting with platforms like <a href="https://www.google.com/docs/about/" target="_blank">Google Docs</a>, <a href="https://www.overleaf.com/" target="_blank">Overleaf</a>, <a href="https://authorea.com/" target="_blank">Authorea</a>, <a href="https://zenodo.org/" target="_blank">Zenodo</a>, and <a href="#!">many more</a>.</p>
		</div>
	</section>
</template>

<script>

import config from '../config'

export default {
	name: 'Publish',

	computed: {
		name () {
			return config.name
		}
	}
}

</script>
