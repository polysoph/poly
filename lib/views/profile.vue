
<template>
	<h3>Profile</h3>
	<img :src="avatarUrl" />
	<p>{{ user.name }} (@{{ user.handle }})</p>
	<p>{{ user.institution }}</p>
</template>

<script>

import db from '../db'

export default {
	name: 'ProfileView',

	data () {
		return {
			user: {
				id: 0,
				name: '',
				handle: '',
				slug: '',
				avatar: {}
			}
		}
	},

	computed: {
		avatarUrl () {
			if (!this.user || !this.user.avatar || !this.user.avatar.url) return 'http://polysoph-assets.s3.amazonaws.com/default.jpg'
			return this.user.avatar.url
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					user(slug: "${t.to.params.slug}") {
						id,
						name,
						handle,
						avatar {
							url
						}
					}
				}
			`)
		}
	}
}

</script>
