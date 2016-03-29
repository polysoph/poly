<template>
	<div class="home">
		<section class="home-introduction home-section" v-el:introduction>
			<div class="home-introduction-content">
				<h1 class="home-introduction-headline">Better research, together.</h1>
				<p class="home-introduction-details">{{ name }} is a platform to <strong>organize</strong>, <strong>collaborate on</strong>, and <strong>publish</strong> research about the world's most challenging scientific problems.</p>
				<div class="home-introduction-cta">
					<div class="home-introduction-cta-buttons">
						<a v-link="{ name: 'discover' }" class="home-button">Explore Projects</a>
					</div>
					<a v-link="{ name: 'about' }" class="home-button-help-text">Learn More</a>
				</div>
			</div>
			<div class="home-introduction-overlay"></div>
		</section>
		<section class="home-summary home-section">
			<div class="home-section-wrapper">
				<div class="home-summary-text">
					<h5>Open Notebook Science</h5>
					<h1>Learn from Others</h1>
					<p>{{ name }} research is conducted entirely in the open. Researchers get more exposure, and readers can learn from others' process, not just their end results.</p>
					<a v-link="{ name: 'about' }" class="home-button">Learn More</a>
				</div>
				<div class="home-summary-questions">
					<div class="home-summary-questions-list">
						<div class="column">
							<question-preview v-for="question in featuredQuestionsColumnA" :question="question"></question-preview>
						</div>
						<div class="column">
							<question-preview v-for="question in featuredQuestionsColumnB" :question="question"></question-preview>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="home-features-intro home-section">
			<div class="home-section-wrapper">
				<div class="home-features-why">
					<h5>Why Polysoph?</h5>
					<h1>Modern Research Tools</h1>
				</div>
			</div>
		</section>
		<section class="home-features home-section">
			<div class="home-section-wrapper">
				<div class="home-features-list">
					<a class="home-feature home-feature--collaboration" href="#!" :class="{ 'home-feature--active': currentFeature === 'collaboration' }" @click.prevent="currentFeature = 'collaboration'">
						<h4>Powerful Collaboration</h4>
						<p>Work with experts around the world, discuss ideas and share artifacts, from papers to data sets.</p>
					</a>
					<a class="home-feature home-feature--review" href="#!"  :class="{ 'home-feature--active': currentFeature === 'review' }" @click.prevent="currentFeature = 'review'">
						<h4>Peer-review, whenever</h4>
						<p>Request feedback from experts in the scientific community at any point in time.</p>
					</a>
					<a class="home-feature home-feature--citation" href="#!"  :class="{ 'home-feature--active': currentFeature === 'citation' }" @click.prevent="currentFeature = 'citation'">
						<h4>Citation and Viewership Metrics</h4>
						<p>All contributions are assigned DOIs. Learn who's contributing to, reading, and citing your work.</p>
					</a>
				</div>
			</div>
			<div class="home-features-callout">
				<browser>
					<img v-show="currentFeature === 'collaboration'" src="http://polysoph-assets.s3.amazonaws.com/assets/collaboration.png" />
					<img v-show="currentFeature === 'review'" src="http://polysoph-assets.s3.amazonaws.com/assets/review.png" />
					<img v-show="currentFeature === 'citation'" src="http://polysoph-assets.s3.amazonaws.com/assets/metrics.png" />
				</browser>
			</div>
		</section>
		<section class="home-funding home-section">
			<div class="home-section-wrapper">
				<div class="home-funding-logos">
					<a href="http://noao.edu" class="home-funding-logo" target="_blank"><img src="http://polysoph-assets.s3.amazonaws.com/funders/noao.svg" /></a>
					<a href="http://nsf.gov" class="home-funding-logo" target="_blank"><img src="http://polysoph-assets.s3.amazonaws.com/funders/nsf.svg" /></a>
					<a href="http://www.nserc-crsng.gc.ca/index_eng.asp" class="home-funding-logo" target="_blank"><img src="http://polysoph-assets.s3.amazonaws.com/funders/nserc.svg" /></a>
					<a href="http://www.nih.gov/" class="home-funding-logo" target="_blank"><img src="http://polysoph-assets.s3.amazonaws.com/funders/nih.svg" /></a>
					<a href="http://www.noaa.gov/" class="home-funding-logo" target="_blank"><img src="http://polysoph-assets.s3.amazonaws.com/funders/noaa.svg" /></a>
					<a href="http://www.cihr-irsc.gc.ca/e/193.html" class="home-funding-logo" target="_blank"><img src="http://polysoph-assets.s3.amazonaws.com/funders/cihr.svg" /></a>
				</div>
				<div class="home-funding-content">
					<h1>Open Grants</h1>
					<p>With partnerships from major grant providers like the <a href="http://nsf.gov/" target="_blank">NSF</a>, <a href="http://noao.edu" target="_blank">NAOA</a>, and many others, {{ name }} gives you more opportunity for proposing and funding your research.</p>
					<a href="#!" class="home-button" @click.prevent>View Open Grants</a>
				</div>
			</div>
		</section>
		<!-- <section class="home-integrations home-section">
			<div class="home-section-wrapper">
				<h2>Integrations with your favourite tools</h2>
				<p>{{ name }} makes it easy to work as you'd like, by connecting with platforms like <a href="https://www.google.com/docs/about/" target="_blank">Google Docs</a>, <a href="https://www.overleaf.com/" target="_blank">Overleaf</a>, <a href="https://authorea.com/" target="_blank">Authorea</a>, <a href="https://zenodo.org/" target="_blank">Zenodo</a>, and <a href="#!">many more</a>.</p>
			</div>
		</section> -->
		<section class="home-join home-section">
			<div class="home-section-wrapper">
				<a v-link="{ name: 'question', params: { slug: 'dhj-theorem' }}" class="home-button">Join Now</a>
			</div>
		</section>
	</div>
</template>
<script>

import db from '../db'
import config from '../config'
import wave from '../components/visualizations/wave'

import QuestionPreview from '../components/question-preview.vue'

export default {
	name: 'HomeView',

	components: {
		QuestionPreview
	},

	data () {
		return {
			currentFeature: 'collaboration',
			questions: [],
			wave: null
		}
	},

	computed: {
		name () {
			return config.name
		},
		featuredQuestionsColumnA () {
			var a = this.questions.filter(q => q.id === 0)
			return a
		},
		featuredQuestionsColumnB () {
			var b = this.questions.filter(q => q.id === 1 || q.id === 2)
			return b
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					questions {
						id,
						title,
						summary,
						status,
						slug,
						category {
							id,
							slug,
							title
						}
					}
				}
			`)
		}
	},

	ready () {
		this.wave = wave(this.$els.introduction)
	},

	destroyed () {
		this.wave.destroy()
	}
}

</script>
