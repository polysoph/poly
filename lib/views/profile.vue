
<template>
	<div class="profile">
		<aside class="profile-user">
			<div class="profile-user-avatar">
				<img class="user-profile-avatar" :src="avatarUrl" />
			</div>
			<div class="profile-user-identity">
				<div class="profile-user-name">{{ user.name }}</div>
				<div class="profile-user-handle">@{{ user.handle }}</div>
			</div>
			<div class="profile-user-institution">{{ user.institution }}</div>
		</aside>
		<main class="profile-activity">
			<h2>Hi</h2>
		</main>
	</div>
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
					user(handle: "${t.to.params.slug}") {
						id,
						name,
						handle,
						institution,
						avatar {
							url
						}
					}
				}
			`).then(res => {
				console.log(res)
				return res
			})
		}
	}
}

</script>
