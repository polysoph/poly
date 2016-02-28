
<template>
	<div class="question">
		<div class="question-header">
			<div class="question-header-wrapper">
				<div class="question-header-details">
					<div class="question-header-category">
						<category-badge class="question-header-category-badge" category="mathematics"></category-badge>
						<a class="question-header-category-title" v-link="{ name: 'discover:discipline', params: { discipline: 'mathematics' }}">Mathematics</a>
						<span class="question-header-category-divider">/</span>
						<a class="question-header-subcategory-title" v-link="{ name: 'discover:discipline', params: { discipline: 'mathematics' }}">Combinatorics</a>
					</div>
					<div class="question-header-actions">
						<a class="question-header-cite-button button cite-button" href="#!" @click.prevent>Cite</a>
						<a class="question-header-follow-button button follow-button" href="#!" @click.prevent>Follow</a>
					</div>
				</div>
				<div class="question-header-primary">
					<h1 class="question-header-title">{{ question.title }}</h1>
				</div>
				<div class="question-header-nav">
					<nav class="question-subview-nav">
						<a class="question-subview-link" v-link="{ name: 'question:overview', exact: true }">Overview</a>
						<a class="question-subview-link" v-link="{ name: 'question:discussion' }">Discussion <span class="question-subview-link-badge" v-show="question.comments.length > 0">{{ question.comments.length }}</span></a>
						<a class="question-subview-link" v-link="{ name: 'question:files' }">Artifacts</a>
						<a class="question-subview-link" v-link="{ name: 'question:contributors' }">Contributors<span class="question-subview-link-badge" v-show="question.contributors.length > 0">{{ question.contributors.length }}</span></a>
					</nav>
				</div>
			</div>
		</div>
		<div class="question-subview">
			<router-view :question="question"></router-view>
		</div>
	</div>
</template>

<script>

// import data from '../tmp/users'

import db from '../db'
import CategoryBadge from '../components/category-badge.vue'

const unique = arr => [...(new Set(arr))]

export default {
	name: 'QuestionView',

	components: {
		Comment,
		CategoryBadge
	},

	data () {
		return {
			question: {
				title: '',
				description: '',
				significance: '',
				artifacts: [],
				checkpoints: [],
				comments: [],
				contributors: [],
				timeline: []
			}
		}
	},

	route: {
		data: t => {
			db(`
				query {
					question(id: 0) {
						title,
						slug,
						description,
						significance,
						comments { id },
						contributors { id }
					}
				}
			`).then(res => {
				console.log(res)
				t.next(res)
			})
		}
	}

		// this.$http.get('/public/data/polymath-1-truncated.json')
		// 	.then(res => {
		// 		const question = res.data.question
		// 		const entities = {}
		// 		entities.comments = question.comments.map((comment, i) => {
		// 			comment.id = i + 1
		// 			return comment
		// 		})
		// 		entities.artifacts = question.artifacts
		// 		entities.checkpoints = question.checkpoints.map(checkpoint => {
		// 			checkpoint.comments = entities.comments.slice(checkpoint.start - 1, checkpoint.end - 1)
		// 			return checkpoint
		// 		})
		// 		const contributors = unique(question.comments.map(c => c.user_id)).map(id => data.users[id])
		//
		// 		this.$set('title', question.title)
		// 		this.$set('context', question.context)
		// 		this.$set('description', question.description)
		// 		this.$set('significance', question.significance)
		// 		this.$set('contributors', contributors)
		//
		// 		this.$set('artifacts', entities.artifacts)
		// 		this.$set('checkpoints', entities.checkpoints)
		// 		this.$set('comments', entities.comments)
		// 		this.$set('timeline', question.timeline)
		// 		this.loading = false
		// 	})
		// 	.catch(err => {
		// 		console.error(err.stack)
		// 	})

}

function toTimeline (obj) {
	switch (obj.type) {
		case 'artifact':
			break
		case 'checkpoint':
			console.log('hi')
			break
		case 'comment':
			break
	}
}

</script>
