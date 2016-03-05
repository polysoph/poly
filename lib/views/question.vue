
<template>
	<div class="question">
		<header class="question-header">
			<div class="question-header-wrapper">
				<div class="question-header-details">
					<div class="question-header-category">
						<category-badge class="question-header-category-badge" category="mathematics"></category-badge>
						<a class="question-header-category-title" v-link="{ name: 'discover:discipline', params: { discipline: 'mathematics' }}">Mathematics</a>
					</div>
					<div class="question-header-actions">
						<a class="question-header-cite-button button cite-button" href="#!" @click.prevent>Cite</a>
						<a class="question-header-follow-button button button--primary follow-button" href="#!" @click.prevent>Follow</a>
					</div>
				</div>
				<div class="question-header-primary">
					<h1 class="question-header-title">{{ question.title }}</h1>
				</div>
			</div>
		</header>
		<section class="question-content">
			<div class="question-content-wrapper">
				<nav class="question-subview-nav">
					<a class="question-subview-link" v-link="{ name: 'question:overview', exact: true }">Overview</a>
					<a class="question-subview-link" v-link="{ name: 'question:discussion' }">Discussion <span class="question-subview-link-badge" v-show="question.commentCount > 0">{{ question.commentCount }}</span></a>
					<a class="question-subview-link" v-link="{ name: 'question:files' }">Artifacts</a>
					<a class="question-subview-link" v-link="{ name: 'question:contributors' }">Contributors<span class="question-subview-link-badge" v-show="question.contributorCount > 0">{{ question.contributorCount }}</span></a>
				</nav>
				<div class="question-subview">
					<router-view :question="question"></router-view>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

import db from '../db'
import store from '../store'
import CategoryBadge from '../components/category-badge.vue'

const unique = arr => [...(new Set(arr))]

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
				contributorCount: 0
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
						commentCount,
						contributorCount
					}
				}
			`)
		}
	}

}

</script>
