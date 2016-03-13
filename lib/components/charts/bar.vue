
<template>
	<div class="bar-chart">
		<svg class="bar-chart-svg" v-el:svg width="100%" height="50"></svg>
	</div>
</template>

<script>

export default {
	name: 'BarChart',

	props: {
		contributions: Array
	},

	data () {
		return {
			width: 0,
			height: 0
		}
	},

	watch: {
		contributions: 'render',
		loading: 'render'
	},

	methods: {
		render () {
			this.resize()

			// HACK: if we don't have any width, retry rendering in 50ms
			if (this.width === 0) {
				setTimeout(() => this.render(), 50)
				return
			}
		},
		resize () {
			const svg = this.$els.svg
			const parent = svg.parentNode
			this.width = parent.clientWidth
			this.height = parent.clientHeight
			svg.setAttribute('width', this.width)
			svg.setAttribute('height', this.height)
		}
	},

	ready () {
		window.addEventListener('resize', this.resize)
	},

	destroyed () {
		window.removeEventListener('resize', this.resize)
	}
}

</script>
