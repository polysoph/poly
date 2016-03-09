<template>
	<div class="discover-page">
		<div class="discover-summary">
			<div class="discover-summary-wrapper">
				<div class="discover-summary-headline">Explore and contribute to global science.</div>
				<div class="discover-summary-subheadline">Look through some of the most exciting projects being worked on by scientists around the world.</div>
			</div>
		</div>
		<main class="discover-content">
			<div class="discover-questions">
				<question-preview :question="question" v-for="question in questions"></question-preview>
			</div>
		</main>
	</div>
</template>

<script>

import db from '../db'

import QuestionPreview from '../components/question-preview.vue'

export default {
	name: 'DiscoverView',

	components: {
		QuestionPreview
	},

	data () {
		return {
			questions: []
		}
	},

	route: {
		data: t => {
			return db(`
				query {
					questions {
						id,
						title,
						slug,
						summary
						description,
						category {
							id,
							title,
							slug
						}
					}
				}
			`)
		}
	}
}

</script>
