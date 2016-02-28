
<template>
	<div class="checkpoint">
		<header class="checkpoint-header">
			<h5 class="checkpoint-header-label">Tim Gowers posted a checkpoint</h5>
			<h3 class="checkpoint-header-title">{{ checkpoint.title }}</h3>
		</header>
		<section class="checkpoint-contents" v-html="checkpoint.contents | markdown"></section>
	</div>
</template>

<script>

export default {
	name: 'Checkpoint',

	props: {
		checkpoint: {
			type: Object,
			required: true
		}
	},

	data () {
		return {
			expanded: false
		}
	},

	methods: {
		expand () {
			this.expanded = true
		}
	}
}

</script>
