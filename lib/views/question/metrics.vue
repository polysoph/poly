
<template>
	<div class="question-metrics">
	</div>
</template>

<script>

export default {
	name: 'QuestionMetricsView',

	data () {
		return {
			question: {}
		}
	},

	route: {
		canActivate () {
			return false
		}
	}
}

</script>
