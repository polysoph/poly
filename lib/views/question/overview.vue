<template>
	<div class="question-overview">
		<main class="question-overview-content">
			<section class="question-overview-content-summary" v-html="question.summary | markdown"></section>
			<section class="question-overview-content-description" v-html="question.description | markdown"></section>
		</main>
		<aside class="question-overview-sidebar">
			<div class="question-overview-sidebar-contribute question-overview-sidebar-section">
				<a class="question-overview-sidebar-contribute-button" v-link="{ name: 'question:discussions', query: { prompt: true } }" :class="{ 'question-overview-sidebar-contribute-button--joined': isContributor }">{{ joinButtonPrompt }}</a>
				<div class="question-overview-sidebar-contribute-status">This project is actively seeking contributions from non-members.</div>
			</div>
			<div class="question-overview-sidebar-metrics question-overview-sidebar-section">
				<a class="question-overview-sidebar-metrics-block" v-link="{ name: 'question:milestones' }">
					<span class="question-overview-sidebar-metrics-block-number">{{ question.milestoneCount }}</span>
					<span class="question-overview-sidebar-metrics-block-label">Milestones</span>
				</a>
				<a class="question-overview-sidebar-metrics-block" v-link="{ name: 'question:contributors' }">
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
								<div class="user-profile-handle">{{ user.name }}</div>
								<div class="user-profile-institution">{{ user.institution }}</div>
							</div>
						</a>
					</div>
				</div>
				<div class="question-overview-sidebar-people-contributors question-overview-sidebar-people-group">
					<header class="question-overview-sidebar-people-header">
						<div class="question-overview-sidebar-people-header-label">Contributors</div>
						<div class="question-overview-sidebar-people-header-count">{{ question.contributors.length }}</div>
					</header>
					<div class="question-overview-sidebar-people-list">
						<a class="user-profile user-profile--avatar-only" v-link="{ name: 'user', params: { slug: user.handle }}" v-for="user in question.contributors">
							<div class="user-profile-avatar" tooltip :title="user.name"><img :src="user.avatar.url" /></div>
						</a>
					</div>
				</div>
			</div>
			<div class="question-overview-sidebar-keywords question-overview-sidebar-section">
				<header class="question-overview-sidebar-keywords-header">
					<div class="question-overview-sidebar-keywords-header-title">Keywords</div>
				</header>
				<div class="question-overview-sidebar-keywords-list">
					<a class="question-overview-sidebar-keyword" href="#!" v-for="keyword in question.keywords" @click.prevent>{{ keyword.title }}</a>
				</div>
			</div>
		</aside>
	</div>
</template>

<script>

import db from '../../db'
import store from '../../store'

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
				contributors: [],
				keywords: []
			}
		}
	},

	computed: {
		isContributor () {
			const user = store.state.user
			const isOwner = this.question.owners.some(u => u.id === user.id)
			const isParticipant = this.question.contributors.some(u => u.id === user.id)
			if (isOwner) return true
			if (isParticipant) return true
			return false
		},
		joinButtonPrompt () {
			if (this.isContributor) {
				return 'Joined Project'
			}
			return 'Join Project'
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
						},
						keywords {
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
