
<template>
	<div class="question">
		<header class="question-header">
			<div class="question-header-wrapper">
				<div class="question-header-details">
					<div class="question-header-category">
						<category-badge class="question-header-category-badge" category="mathematics"></category-badge>
						<a class="question-header-category-title" v-link="{ name: 'discover:discipline', params: { discipline: 'mathematics' }}">Mathematics</a>
					</div>
				</div>
				<div class="question-header-primary">
					<h1 class="question-header-title">{{ question.title }}</h1>
				</div>
				<div class="question-header-actions">
					<a class="question-header-share-button share-button" href="#!" @click.prevent>Share</a>
					<a class="question-header-cite-button cite-button" href="#!" @click.prevent>Cite</a>
					<a class="question-header-follow-button follow-button" href="#!" @click.prevent>
						<span class="follow-button-text">Follow</span>
						<span class="follow-button-number">{{ question.followerCount }}</span>
					</a>
				</div>
			</div>
		</header>
		<section class="question-content">
			<div class="question-content-wrapper">
				<nav class="question-nav">
					<div class="question-nav-group">
						<a class="question-nav-link" v-link="{ name: 'question:overview', exact: true }">Question</a>
					</div>
					<div class="question-nav-group">
						<a class="question-nav-link" v-link="{ name: 'question:milestones' }">Milestones</a>
						<a class="question-nav-link" v-link="{ name: 'question:discussions' }">Discussions</a>
						<a class="question-nav-link" v-link="{ name: 'question:tasks' }" v-if="question.hasTasksEnabled">Tasks</a>
						<a class="question-nav-link" v-link="{ name: 'question:artifacts' }">Artifacts</a>
					</div>
					<div class="question-nav-group">
						<a class="question-nav-link" v-link="{ name: 'question:contributors' }">Contributors</a>
						<a class="question-nav-link" v-link="{ name: 'question:metrics' }">Metrics</a>
					</div>
					<div class="question-nav-group">
						<a class="question-nav-link" v-link="{ path: '#!' }">Settings</a>
					</div>
				</nav>
				<div class="question-subview">
					<router-view transition="fade" transition-mode="out-in"></router-view>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

import db from '../db'

import CategoryBadge from '../components/category-badge.vue'

export default {
	name: 'QuestionView',

	components: {
		CategoryBadge
	},

	data () {
		return {
			question: {
				id: 0,
				title: '',
				slug: '',
				commentCount: 0,
				contributorCount: 0,
				hasTasksEnabled: true
			}
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						id,
						title,
						slug,
						followerCount,
						hasTasksEnabled
					}
				}
			`).then(res => {
				console.log(res)
				return res
			})
		}
	}

}

</script>
