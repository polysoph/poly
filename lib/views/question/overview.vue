<template>
	<div class="question-overview">
		<main class="question-overview-content">
			<section class="question-overview-content-summary" v-html="question.summary | markdown"></section>
			<section class="question-overview-content-description" v-html="question.description | markdown"></section>
		</main>
		<aside class="question-overview-sidebar">
			<div class="question-overview-sidebar-contribute question-overview-sidebar-section">
				<a class="question-overview-sidebar-contribute-button" v-link="{ name: 'question:tasks' }">Join Project</a>
				<div class="question-overview-sidebar-contribute-status">This project is actively seeking contributions from non-members.</div>
			</div>
			<div class="question-overview-sidebar-metrics question-overview-sidebar-section">
				<a class="question-overview-sidebar-metrics-block" v-link="{ name: 'question:milestones' }">
					<span class="question-overview-sidebar-metrics-block-number">{{ question.milestoneCount }}</span>
					<span class="question-overview-sidebar-metrics-block-label">Milestones</span>
				</a>
				<a class="question-overview-sidebar-metrics-block" href="#!">
					<span class="question-overview-sidebar-metrics-block-number">{{ question.citationCount }}</span>
					<span class="question-overview-sidebar-metrics-block-label">Citations</span>
				</a>
			</div>
			<div class="question-overview-sidebar-people question-overview-sidebar-section">
				<div class="question-overview-sidebar-people-owners question-overview-sidebar-people-group">
					<div class="question-overview-sidebar-people-header">
						<div class="question-overview-sidebar-people-header-label">Owners</div>
						<div class="question-overview-sidebar-people-header-count">{{ question.owners.length }}</div>
					</div>
					<div class="question-overview-sidebar-people-list">
						<a class="user-profile user-profile--medium" v-link="{ name: 'user', params: { slug: user.handle }}" v-for="user in question.owners">
							<div class="user-profile-avatar"><img :src="user.avatar.url" /></div>
							<div class="user-profile-details">
								<div class="user-profile-handle">{{ user.handle }}</div>
								<div class="user-profile-institution">{{ user.institution }}</div>
							</div>
						</a>
					</div>
				</div>
				<div class="question-overview-sidebar-people-contributors question-overview-sidebar-people-group">
					<div class="question-overview-sidebar-people-header">
						<div class="question-overview-sidebar-people-header-label">Contributors</div>
						<div class="question-overview-sidebar-people-header-count">{{ question.contributors.length }}</div>
					</div>
					<div class="question-overview-sidebar-people-list">
						<a class="user-profile user-profile--avatar-only" v-link="{ name: 'user', params: { slug: user.handle }}" v-for="user in question.contributors">
							<div class="user-profile-avatar"><img :src="user.avatar.url" /></div>
						</a>
					</div>
				</div>
			</div>
			<div class="question-overview-sidebar-keywords question-overview-sidebar-section">
			</div>
		</aside>
	</div>
</template>

<script>

import db from '../../db'

export default {
	name: 'QuestionOverviewView',

	data () {
		return {
			question: {
				summary: '',
				description: '',
				milestoneCount: 0,
				citationCount: 0,
				owners: [],
				contributors: []
			}
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						summary,
						description,
						milestoneCount,
						citationCount,
						owners {
							id,
							name,
							handle,
							institution,
							avatar {
								url
							}
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

</script>
