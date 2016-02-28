<template>
	<a v-link="{ name: 'user', params: { user: user.handle }}" class="user-thumbnail-profile">
		<img :src="avatarUrl" class="user-thumbnail-profile-image" />
	</a>
</template>
<!-- <div class="user-thumbnail-profile"> -->
<!-- <div class="user-thumbnail-profile-details">
	<a v-link="{ name: 'user', params: { user: user.handle }}" class="user-thumbnail-profile-name">{{ user.name }}</a>
	<a v-link="{ path: '#!' }" class="user-thumbnail-profile-institution">{{ user.institution }}</a>
</div> -->
<!-- </div> -->

<script>

import data from '../tmp/users'

const unknown = {
	username: 'unknown',
	name: 'Unknown User',
	avatar: {}
}

export default {
	name: 'UserThumbnailProfile',

	props: {
		userId: {
			type: Number,
			required: true
		}
	},

	data () {
		return {
		}
	},

	computed: {
		user () {
			return data.users.find(u => u.id === this.userId) || unknown
		},
		avatarUrl () {
			return this.user.avatar.url || 'http://polysoph-assets.s3.amazonaws.com/default.jpg'
		}
	}
}


</script>
