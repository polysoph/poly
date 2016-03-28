<template>
	<div class="home">
		<section class="home-introduction home-section" v-el:introduction>
			<div class="home-introduction-content">
				<h1 class="home-introduction-headline">Do better research, together.</h1>
				<p class="home-introduction-details"><span class="faded">{{ name }} is a platform to </span><strong>organize</strong><span class="faded">, </span><strong>collaborate on</strong><span class="faded">, and </span><strong>publish</strong> research <span class="faded"> about the world's most challenging scientific problems.</span></p>
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
					<h1>Open Notebook Research</h1>
					<p>{{ name }} enables the whole research process to be conducted in the open. Researchers get more exposure, and readers can learn from others' process, not just their end results.</p>
					<a href="#!" class="home-button">See All</a>
				</div>
				<div class="home-summary-questions">
					<header class="home-summary-questions-header">
						<h3>Popular Questions</h3>
						<div class="home-summary-questions-header-period">
							This week
						</div>
					</header>
					<div class="home-summary-questions-list">
						<div class="question-preview" v-for="question in featuredQuestions">
							<div class="question-preview-title">{{ question.title }}</div>
							<div class="question-preview-summary" v-html="question.summary | markdown"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="home-questions">
			<div class="home-section-wrapper">
				<nav class="home-questions-nav questions-nav">
				</nav>
				<div class="home-questions-list">
					<question-preview :question="question" v-for="question in questions" data-open="true"></question-preview>
				</div>
			</div>
		</section>
		<section class="home-publish">
			<p>Looking to publish your own research?</p>
			<a v-link="{ name: 'publish' }">Join the Private Beta</a>
		</section>
		<section class="home-sign-up home-section">
			<a v-link="{ name: 'join' }">Join Now</a>
		</section>
		<footer class="home-footer">
			<div class="home-footer-column">

			</div>
			<div class="home-footer-column">
			</div>
		</footer>
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
			questions: [],
			wave: null
		}
	},

	computed: {
		name () {
			return config.name
		},
		featuredQuestions () {
			return this.questions.slice(0, 3)
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
