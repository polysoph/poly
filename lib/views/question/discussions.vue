<template>
	<div class="question-discussions">
		<header class="question-discussions-header question-subview-header">
			<div class="question-discussions-masthead question-subview-masthead">
				<div class="question-subview-title">Discussions <span class="question-subview-title-help ss-icon ss-help" tooltip title="Discussions are a way to frame your problem and keep everyone up-to-date on progress that gets made."></span></div>
				<!-- <input class="question-subview-search" placeholder="Search" /> -->
			</div>
			<a class="question-discussions-prompt"
				v-show="$route.query.prompt === 'true'"
				v-link="{ name: 'question:discussions' }"
				transition="fade">
				<span class="question-discussions-prompt-icon"></span>
				<span class="question-discussions-prompt-text">Looking to contribute? Below are some ongoing discussions that we'd love input into.</span>
			</a>
			<div class="question-discussions-filter-bar question-subview-filter-bar">
				<a v-link="{ name: 'question:discussions', activeClass: 'no-op' }" :class="{ 'is-active': isFilteringOpen }" class="question-subview-filter-category">Ongoing <span class="question-subview-filter-category-count">{{ openDiscussionCount }}</span></a>
				<a v-link="{ name: 'question:discussions', query: { status: 'resolved' }, activeClass: 'no-op' }" :class="{ 'is-active': isFilteringResolved }" class="question-subview-filter-category">Resolved <span class="question-subview-filter-category-count">{{ resolvedDiscussionCount }}</span></a>
				<a v-link="{ name: 'question:discussion:new' }" class="question-discussions-new-button new-button">New Discussion</a>
			</div>
		</header>
		<main class="question-discussions-content">
			<discussion-preview class="question-discussion-preview" :discussion="discussion" v-for="discussion in filteredDiscussions"></discussion-preview>
		</main>
	</div>
</template>

<script>

import db from '../../db'
import DiscussionPreview from '../../components/discussion-preview.vue'

export default {
	name: 'QuestionDiscussionsView',

	components: {
		DiscussionPreview
	},

	data () {
		return {
			question: {
				discussions: []
			}
		}
	},

	computed: {
		filteredDiscussions () {
			const discussions = this.question.discussions
				.filter(d => d.status.toLowerCase() === this.filterStatus)
			return discussions
		},
		filterStatus () {
			if (this.$route.query.status && this.$route.query.status === 'resolved') {
				return 'resolved'
			}
			return 'open'
		},
		isFilteringOpen () {
			if (this.filterStatus === 'open') return true
			return false
		},
		isFilteringResolved () {
			if (this.filterStatus === 'resolved') return true
			return false
		},
		openDiscussionCount () {
			const open = this.question.discussions.filter(d => d.status === 'OPEN')
			return open.length
		},
		resolvedDiscussionCount () {
			const resolved = this.question.discussions.filter(d => d.status === 'RESOLVED')
			return resolved.length
		},
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						discussions {
							id,
							title,
							excerpt,
							status,
							commentCount,
							lastUpdatedAt,
							participants {
								id,
								handle,
								name,
								avatar {
									url
								}
							},
							owner {
								id,
								handle,
								name,
								avatar {
									url
								}
							}
						}
					}
				}
			`)
		}
	}
}

</script>
