
<template>
	<div class="line-chart">
		<div class="line-chart-loading"></div>
		<svg class="line-chart-svg" v-el:svg width="100%" height="200"></svg>
	</div>
</template>

<script>

import d3 from 'd3'

import sortByDateKey from '../../helpers/sort-by-date-key'
import roundToNearestDay from '../../helpers/round-to-nearest-day'

const sortByDatesCreatedAt = sortByDateKey('createdAt')

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
		loading: Boolean,
		startDate: Date,
		endDate: Date
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

			const svg = d3.select(this.$els.svg)
			const data = this.contributions.concat()
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

			const xAxis = d3.svg.axis()
		    .scale(x)
		    .orient('bottom')
				.outerTickSize(1)
				.innerTickSize(12)
				.tickValues([d3.min(dates), d3.max(dates)])
				.tickFormat(d3.time.format('%b %d, %Y'))
			const yAxis = d3.svg.axis()
				.scale(y)
				.orient('left')
				.innerTickSize(-this.width)
				.outerTickSize(0)
				.tickPadding(10)

			const line = d3.svg.line()
				.x(d => x(d.date))
				.y(d => y(d.count))
				.interpolate('basis')

			svg.selectAll('*').remove()

			svg.append('g')
				.attr('class', 'x-axis')
				.attr('transform', `translate(0, ${this.height - 40})`)
				.call(xAxis)
			// svg.append('g')
			// 	.attr('class', 'y-axis')
			// 	.attr('transform', `translate(40, 0)`)
			// 	.call(yAxis)

			svg.append('path')
				.datum(grouped)
				.attr('class', 'line')
				.attr('d', line)

			svg.selectAll('text')
				.attr('style', '')
				.attr('text-anchor', 'start')
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
