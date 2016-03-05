
<template>
	<div class="artifact">
		<div class="artifact-context"><a class="artifact-context-user" v-link="{ name: 'user', params: { user: owner.handle } }">{{ owner.name }}</a> referenced a paper</div>
		<a class="artifact-content" href="{{ artifact.source.url }}" target="_blank">
			<h3 class="artifact-title">{{ artifact.title }}</h3>
			<div class="artifact-source">{{ hostname }}</div>
		</a>
	</div>
</template>

<script>

import url from 'component-url'

export default {
	name: 'Artifact',

	props: {
		artifact: {
			type: Object,
			required: true
		}
	},

	data () {
		return {}
	},

	computed: {
		hostname () {
			return url.parse(this.artifact.source.url).hostname
		},
		owner () {
			return data.users.find(u => u.id === this.artifact.user_id)
		}
	}
}

</script>
