
<template>
	<div class="question-contributors">
		<header class="question-subview-header">
			<div class="question-subview-masthead">
				<div class="question-subview-title">Contributions <span class="question-subview-title-help ss-icon ss-help" tooltip title="Comments, artifacts, tasks, and other forms of interaction"></span></div>
			</div>
		</header>
		<div class="question-contributors-global">
			<line-chart class="question-contributors-global-chart" :contributions="question.contributions" :loading="$loadingRouteData"></line-chart>
		</div>
		<div class="question-contributors-list">
			<a v-link="{ name: 'user', params: { slug: contributor.handle }}" class="avatar" v-for="contributor in question.contributors">
				<img :src="contributor.avatar.url" class="avatar-image" />
			</a>
		</div>
	</div>
</template>

<script>

import db from '../../db'

import LineChart from '../../components/charts/line.vue'

export default {
	name: 'QuestionContributorsView',

	components: {
		LineChart
	},

	data () {
		return {
			question: {
				id: '',
				contributions: [],
				contributors: []
			}
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						id,
						contributions {
							id,
							createdAt
						},
						contributors {
							id,
							name,
							handle,
							avatar {
								url
							}
						}
					}
				}
			`)
		}
	}
}
