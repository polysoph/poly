
<template>
	<div class="question-discussion">
		<div class="question-discussion-content">
			<div class="question-timeline-loading" v-show="!question.comments.length">
				Loading...
			</div>
			<div class="question-timeline">
				<comment class="question-timeline-comment" :comment="comment" v-for="comment in question.comments"></comment>
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
			<!-- <div class="question-comment-list" v-show="comments.length">
				<comment v-for="comment in comments" track-by="id" :comment="comment"></comment>
			</div> -->
			<div class="question-timeline-prompt">
				<p><a href="#">Sign up</a> or <a href="#">Sign in</a> to join the discussion.</p>
			</div>
		</div>
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

	props: {
		question: {
			type: Object,
			required: true
		}
	},

	data () {
		return {}
	},

	asyncData (resolve, reject) {
		return db(`
			query {
				question {
					comments {
						id,
						createdAt,
						contents
					}
				}
			}
		`)
	},

	ready () {
		const links = select(this.$el, '[href^="#comment-"]')
		links.forEach(el => el.addEventListener('click', scrollToAnchor))
	}
}

</script>
