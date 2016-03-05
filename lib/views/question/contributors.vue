
<template>
	<div class="question-contributors-list">
		<a v-link="{ name: 'user', params: { slug: contributor.handle }}" class="avatar" v-for="contributor in question.contributors">
			<img :src="contributor.avatar.url" class="avatar-image" />
		</a>
	</div>
</template>

<script>

import db from '../../db'

export default {
	name: 'QuestionContributorsView',

	data () {
		return {
			question: {
				id: '',
				contributors: []
			}
		}
	},

	route: {
		data (t) {
			return db(`
				query {
					question(slug: "${t.to.params.slug}") {
						id,
						contributors {
							id,
							name,
							handle,
							avatar {
								url
							}
						}
					}
				}
			`)
		}
	}
}

</script>
