<template>
	<div class="question-overview">
		<div class="question-overview-content">
			<!-- <section class="question-description-section question-description-section-context">
				<h3>Context</h3>
				<div class="question-description-section-context-content" v-html="$parent.context | markdown"></div>
			</section> -->
			<section class="question-description-section question-description-section-description">
				<h3>About the Question</h3>
				<div class="question-description-section-description-content" v-html="question.description | markdown"></div>
			</section>
			<section class="question-description-section question-description-section-significance">
				<h3>Significance</h3>
				<div class="question-description-section-significance-content" v-html="question.significance | markdown"></div>
			</section>
			<h3>Prior Work</h3>
			<p>A listing of previous papers and developments in the field that would be beneficial for people contributing.</p>
		</div>
		<div class="question-overview-sidebar">
			<div class="question-overview-sidebar-contributors">
				<h4>Contributors</h4>
			</div>
		</div>
	</div>
</template>

<script>

import db from '../../db'

export default {
	name: 'QuestionOverviewView',

	data () {
		return {
			question: {
				description: '',
				significance: '',
				priorWork: ''
			}
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						description,
						significance,
						priorWork
					}
				}
			`)
		}
	}
}

</script>
