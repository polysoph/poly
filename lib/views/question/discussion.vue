
<template>
	<div class="question-discussion">
		<div class="question-discussion-timeline-loading" v-show="!hasComments">
			Loading...
		</div>
		<main class="question-discussion-content" v-show="hasComments">
			<header class="question-discussion-header">
				<div class="question-discussion-subview">
					<div class="question-discussion-title">{{ discussion.title }}</div>
					<div class="question-discussion-subtitle">
						Started by
						<span class="question-discussion-author">{{ discussion.firstComment.owner.name }}</span>
						on
						<span class="question-discussion-created-at">{{ discussion.firstComment.createdAt | date 'MMM D, Y'}}</span>
						•
						<span class="question-discussion-count">{{ discussion.commentCount }} comments</span>
					</div>
				</div>
			</header>
			<div class="question-discussion-timeline">
				<template v-for="entity in discussion.timeline" track-by="id">
					<template v-if="entity.contents">
						<comment class="question-timeline-comment" :comment="entity"></comment>
					</template>
					<template v-if="entity.type">
						<action class="question-timeline-action" :action="entity"></action>
					</template>
				</template>
			</div>
			<div class="question-discussion-prompt">
				<p><a href="#" @click.prevent>Sign up</a> or <a v-link="{ name: 'login' }">Sign in</a> to join the discussion.</p>
			</div>
		</main>
		<div class="question-discussion-navigation">
		</div>
	</div>
</template>

<script>

import db from '../../db'

import Action from '../../components/action.vue'
import Comment from '../../components/comment.vue'
import Artifact from '../../components/artifact.vue'

import select from '../../helpers/select'
import scrollToAnchor from '../../helpers/scroll-to-anchor'

export default {
	name: 'QuestionDiscussionView',

	components: {
		Action,
		Artifact,
		Comment
	},

	data () {
		return {
			question: {
				id: 0,
				discussion: {
					firstComment: {
						owner: {}
					},
					timeline: []
				}
			}
		}
	},

	computed: {
		discussion () {
			return this.question.discussion
		},
		hasComments () {
			return this.discussion.timeline.length > 0
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
							commentCount,
							firstComment {
								id,
								createdAt,
								owner {
									id,
									name
								}
							}
							timeline {
								... on Action {
									id,
									createdAt,
									type,
									count,
									actee {
										id,
										name,
										handle,
										avatar {
											url
										}
									},
									actor {
										id,
										name,
										handle,
										avatar {
											url
										}
									},
									artifact {
										id,
										title
									}
								}
								... on Artifact {
									id,
									title
								}
								... on Comment {
									id,
									createdAt,
									contents,
									owner {
										id,
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
				}
			`).then(res => {
				console.log(res.question.discussion)
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
