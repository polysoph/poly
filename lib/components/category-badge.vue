<template>
	<div class="category-badge" :class="className"></div>
</template>

<script>

const CLASS_NAME = 'category-badge'
const hasWhitespace = str => /\s/g.test(str)
const hasNumeric = str => /\d/g.test(str)

export default {
	name: 'CategoryBadge',

	props: {
		category: {
			type: String,
			required: true,
			validator (val) {
				if (hasWhitespace(val)) return false
				if (hasNumeric(val)) return false
				return true
			}
		}
	},

	data () {
		return {}
	},

	computed: {
		className () {
			return [
				`${CLASS_NAME}`,
				`${CLASS_NAME}--${this.category}`
			]
		}
	}
}

</script>
