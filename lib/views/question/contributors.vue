
<template>
	<div class="question-contributors-list">
		<user-thumbnail-profile class="question-contributor" v-for="contributor in contributors" :user-id="contributor.id"></user-thumbnail-profile>
	</div>
</template>

<script>

import UserThumbnailProfile from '../../components/user-thumbnail-profile.vue'

export default {
	name: 'QuestionContributorsView',

	components: {
		UserThumbnailProfile
	},

	data () {
		return {}
	},

	computed: {
		contributors () {
			return this.$parent.contributors
		}
	}
}

</script>
