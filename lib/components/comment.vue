
<template>
	<div class="comment" id="comment-{{ comment.id }}">
		<aside class="comment-aside">
			<user-thumbnail-profile class="comment-user-thumbnail-profile" :user-id="comment.user_id"></user-thumbnail-profile>
		</aside>
		<div class="comment-body">
			<header class="comment-header">
				<a class="comment-header-user" v-link="{ name: 'user', params: { user: user.handle }}">
					<div class="comment-header-user-name">{{ user.name }}</div>
					<div class="comment-header-user-handle">@{{ user.handle }}</div>
				</a>
				<div class="comment-header-metadata">
					<a class="comment-header-metadata-timestamp" href="#comment-{{ comment.id }}">{{ comment.timestamp | date 'MMM D' }}</a>
				</div>
			</header>
			<section class="comment-contents" v-html="comment.contents | markdown"></section>
		</div>
	</div>
</template>

<script>

import data from '../tmp/users'

import UserThumbnailProfile from './user-thumbnail-profile.vue'
import select from '../helpers/select'
import scrollToAnchor from '../helpers/scroll-to-anchor'

export default {
	name: 'Comment',

	components: {
		UserThumbnailProfile
	},

	props: {
		comment: {
			type: Object,
			required: true
		}
	},

	data () {
		return {}
	},

	computed: {
		user () {
			return data.users.find(u => u.id === this.comment.user_id)
		}
	},

	ready () {
		const links = select(this.$el, '[href^="#comment-"]:not(.comment-header-timestamp)')
		links.forEach(el => el.addEventListener('click', scrollToAnchor))
	}
}


</script>
