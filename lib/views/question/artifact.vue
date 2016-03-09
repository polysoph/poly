
<template>
	<div class="question-artifact">
	</div>
</template>

<script>

export default {
	name: 'QuestionArtifactView',

	data () {
		return {
			question: {
			}
		}
	},

	route: {
		canActivate () {
			return false
		}
	}
}

</script>
