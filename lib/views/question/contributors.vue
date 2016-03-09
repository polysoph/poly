
<template>
	<div class="question-contributors">
		<header class="question-contributors-header question-subview-header">
			<div class="question-contributors-masthead question-subview-masthead">
				<div class="question-contributors-title question-subview-title">Contributors <span class="question-subview-title-help ss-icon ss-help" tooltip title="Comments, artifacts, tasks, and other interactions"></span></div>
				<div class="question-contributors-note">{{ question.contributions.length }} contributions</div>
			</div>
		</header>
		<div class="question-contributors-global">
			<line-chart class="question-contributors-global-chart" :contributions="question.contributions" :start-date="startDate" :end-date="endDate" :loading="$loadingRouteData"></line-chart>
		</div>
		<div class="question-contributors-list">
			<div class="question-contributor-preview" v-for="contributor in sortedPeople">
				<header class="question-contributor-preview-header">
					<a class="question-contributor-preview-avatar" v-link="contributor.handle | linkToProfile">
						<img class="question-contributor-preview-avatar-image" :src="contributor.avatar.url" />
					</a>
					<div class="question-contributor-preview-header-details">
						<a class="question-contributor-preview-user-name" v-link="contributor.handle | linkToProfile">{{ contributor.name }}</a>
						<span class="question-contributor-preview-contribution-count">{{ getContributionCountForUser(contributor.id) }} {{ getContributionCountForUser(contributor.id) | pluralize 'contribution' }}</span>
					</div>
				</header>
				<!-- <bar-chart class="question-contributor-preview-chart" :contributions="getContributionsForUser(contributor.id)" :loading="$loadingRouteData"></bar-chart> -->
			</div>
		</div>
	</div>
</template>

<script>

import db from '../../db'

import LineChart from '../../components/charts/line.vue'
import BarChart from '../../components/charts/bar.vue'

export default {
	name: 'QuestionContributorsView',

	components: {
		BarChart,
		LineChart
	},

	data () {
		return {
			question: {
				id: '',
				contributions: [],
				people: []
			}
		}
	},

	methods: {
		getContributionsForUser (id) {
			const contributions = this.question.contributions
				.filter(contribution => contribution.owner.id === id)
			return contributions
		},
		getContributionCountForUser (id) {
			return this.getContributionsForUser(id).length
		}
	},

	computed: {
		startDate () {
			return new Date(this.question.createdAt)
		},
		endDate () {
			return new Date(this.question.lastUpdatedAt)
		},
		sortedPeople () {
			return this.question.people
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						id,
						createdAt,
						lastUpdatedAt,
						contributions {
							id,
							createdAt,
							owner { id }
						},
						people {
							id,
							name,
							handle,
							avatar { url }
						}
					}
				}
			`)
		}
	}
}
