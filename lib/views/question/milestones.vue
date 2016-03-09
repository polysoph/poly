<template>
	<div class="question-milestones">
		<header class="question-milestones-header question-subview-header">
			<div class="question-milestones-masthead question-subview-masthead">
				<div class="question-subview-title">Milestones <span class="question-subview-title-help ss-icon ss-help" tooltip title="Milestones mark your progress, help new contributrions catch up, and keep the public informed of your work."></span></div>
				<!-- <input class="question-subview-search" placeholder="Search" /> -->
				<a class="new-button" v-link="{ name: 'question:milestones' }">New Milestone</a>
			</div>
		</header>
		<main class="question-milestones-list">
			<milestone-preview class="question-milestone-preview" :milestone="milestone" :index="sortedMilestones.length - $index" v-for="milestone in sortedMilestones"></milestone-preview>
		</main>
	</div>
</template>

<script>

import db from '../../db'
import MilestonePreview from '../../components/milestone-preview.vue'

import sortByDateKey from '../../helpers/sort-by-date-key'

const sortByDateCreated = sortByDateKey('createdAt')

export default {
	name: 'QuestionMilestonesView',

	components: {
		MilestonePreview
	},

	data () {
		return {
			question: {
				milestones: []
			}
		}
	},

	computed: {
		sortedMilestones () {
			const milestones = this.question.milestones
				.concat()
				.sort(sortByDateCreated)
			return milestones
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						milestones {
							id,
							title,
							contents,
							createdAt,
							owner { id, name, handle, avatar { url } },
							commentCount,
							viewCount
						}
					}
				}
			`)
		}
	}
}

</script>
