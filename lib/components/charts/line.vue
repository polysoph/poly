
<template>
	<svg class="line-chart" v-el:svg></svg>
</template>

<script>

import d3 from 'd3'
import vue from 'vue'

const sortByDatesWith = (key) => (a, b) => (new Date(b[key]) - new Date(a[key]))
const sortByDatesCreatedAt = sortByDatesWith('createdAt')

const roundToNearestDay = d => {
	const date = new Date(d)
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)
	date.setMilliseconds(0)
	return date
}

const PADDING = 20

/**
 * A slightly deceptive line-chart component that only ever charts the
 * `createdAt` property of passed in data
 *
 */
export default {
	name: 'LineChart',

	props: {
		contributions: Array,
		loading: Boolean
	},

	data () {
		return {
			width: 0,
			height: 0
		}
	},

	watch: {
		contributions: 'render'
	},

	methods: {
		render (input) {

			this.resize()
			const svg = d3.select(this.$els.svg)
			const data = input.concat()
			const sortedData = data.sort(sortByDatesCreatedAt)

			const grouped = d3.nest()
				.key(d => roundToNearestDay(d.createdAt))
				.rollup(arr => arr.length)
				.entries(sortedData)
				.map(d => ({ date: new Date(d.key), count: d.values }))

			const dates = grouped.map(d => d.date)
			const count = grouped.map(d => d.count)

			const x = d3.time.scale()
				.domain(d3.extent(dates))
				.range([PADDING, this.width - PADDING])
			const y = d3.scale.linear()
				.domain([0, d3.max(count)])
				.range([this.height - PADDING, PADDING])

			const line = d3.svg.line()
				.x(d => x(d.date))
				.y(d => y(d.count))
				.interpolate('basis')

			svg.append('path')
				.datum(grouped)
				.attr('class', 'line')
				.attr('d', line)

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
