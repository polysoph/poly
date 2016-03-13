
<template>
	<div class="discussion-preview">
		<div class="discussion-preview-content">
			<a class="discussion-preview-title" v-link="linkToDiscussion">{{ discussion.title }}</a>
			<div class="discussion-preview-by-line">
				<a class="discussion-preview-last-updated-at" v-link="linkToDiscussion">Last updated <span tooltip :title="discussion.lastUpdatedAt | date 'MMM D, Y'">{{ discussion.lastUpdatedAt | dateFromNow }}</span></a>
			</div>
		</div>
		<div class="discussion-preview-meta">
			<div class="discussion-preview-user-avatars">
				<a class="discussion-preview-user-avatar user-profile user-profile--avatar-only" v-link="{ name: 'user', params: { slug: user.handle } }" tooltip :title="user.name" v-for="user in discussion.participants">
					<img class="user-profile-avatar" :src="user.avatar.url" />
				</a>
			</div>
			<a v-link="linkToDiscussion" class="discussion-preview-comment-count ss-chat">{{ discussion.commentCount }}</a>
		</div>
	</div>
</template>

<script>

export default {
	name: 'DiscussionPreview',

	props: {
		discussion: {
			type: Object,
			required: true
		}
	},

	computed: {
		linkToDiscussion () {
			return { name: 'question:discussion', params: { id: this.discussion.id } }
		}
	}
}

</script>
