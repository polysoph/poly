
<template>
	<h3>Profile</h3>
	<img :src="avatarUrl" />
	<p>{{ user.name }} (@{{ user.handle }})</p>
	<p>{{ user.institution }}</p>
</template>

<script>

import data from '../tmp/users'

export default {
	name: 'ProfileView',

	data () {
		return {
			user: {}
		}
	},

	computed: {
		avatarUrl () {
			if (!this.user || !this.user.avatar || !this.user.avatar.url) return 'http://polysoph-assets.s3.amazonaws.com/default.jpg'
			return this.user.avatar.url
		}
	},

	route: {
		data: t => {
			const user = data.users.find(u => u.handle === t.to.params.user)
			t.next({ user })
		}
	}
}

</script>
