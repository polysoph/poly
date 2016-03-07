<template>
	<div class="discover-page">
		<div class="discover-summary">
			A way of finding problems that might interest mathematicians/scientists, in an attempt to persuade them to join, and be a part of cool things that are happening.
		</div>
		<div class="discover-questions">
			<question-preview :question="question" v-for="question in questions"></question-preview>
		</div>
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
