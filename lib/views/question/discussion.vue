
<template>
	<div class="question-discussion">
		<div class="question-discussion-timeline-loading" v-show="!hasComments">
			Loading...
		</div>
		<main class="question-discussion-content" v-show="hasComments">
			<header class="question-discussion-header">
				<div class="question-discussion-title">{{ discussion.title }}</div>
			</header>
			<div class="question-discussion-timeline">
				<comment class="question-discussion-comment" v-for="comment in discussion.comments" :comment="comment" track-by="id"></comment>
				<!-- <template v-for="entity in question.comments" track-by="id">
					<template v-if="entity.type === 'artifact'">
						<artifact class="question-timeline-artifact" :artifact="resolveComponent(entity.type, entity.ref)"></artifact>
					</template>
					<template v-if="entity.type === 'checkpoint'">
						<checkpoint class="question-timeline-checkpoint" :checkpoint="resolveComponent(entity.type, entity.ref)">></checkpoint>
					</template>
					<template v-if="entity.type === 'comment'">
						<comment class="question-timeline-comment" :comment="resolveComponent(entity.type, entity.ref)">></comment>
					</template>
				</template> -->
			</div>
			<!-- <div class="question-comment-list" v-show="question.comments.length">
				<comment v-for="comment in question.comments" track-by="id" :comment="comment"></comment>
			</div> -->
			<div class="question-discussion-prompt">
				<p><a href="#">Sign up</a> or <a href="#">Sign in</a> to join the discussion.</p>
			</div>
		</main>
		<div class="question-discussion-navigation">
		</div>
	</div>
</template>

<script>

import db from '../../db'

import Comment from '../../components/comment.vue'
import Checkpoint from '../../components/checkpoint.vue'
import Artifact from '../../components/artifact.vue'

import select from '../../helpers/select'
import scrollToAnchor from '../../helpers/scroll-to-anchor'

export default {
	name: 'QuestionDiscussionView',

	components: {
		Artifact,
		Comment,
		Checkpoint,
	},

	data () {
		return {
			question: {
				id: 0,
				discussion: {
					comments: []
				}
			}
		}
	},

	computed: {
		discussion () {
			return this.question.discussion
		},
		hasComments () {
			return this.discussion.comments.length > 0
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						id,
						discussion(id: ${t.to.params.id}) {
							id,
							title,
							owner {
								id,
								name,
								handle
							},
							comments {
								id,
								createdAt,
								contents,
								owner {
									name,
									handle,
									avatar {
										url
									}
								}
							}
						}
					}
				}
			`).then(res => {
				console.log(res)
				return res
			})
		}
	},

	ready () {
		const links = select(this.$el, '[href^="#comment-"]')
		links.forEach(el => el.addEventListener('click', scrollToAnchor))
	}
}

</script>
